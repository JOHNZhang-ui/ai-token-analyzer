#!/usr/bin/env python3
"""
TokenCost — AI Model Price Crawler
===================================
Automatically scrapes official API pricing pages from major AI providers
and updates js/models.js with the latest prices.

Usage:
  python crawler.py              # Fetch all providers
  python crawler.py --provider openai  # Single provider
  python crawler.py --dry-run    # Print updates without writing file
  python crawler.py --schedule   # Run as a daemon every 24h

Requirements:
  pip install requests beautifulsoup4 lxml

Provider pages scraped:
  - OpenAI:    https://openai.com/api/pricing/
  - Anthropic: https://www.anthropic.com/pricing
  - Google:    https://ai.google.dev/pricing
  - DeepSeek:  https://api-docs.deepseek.com/quick_start/pricing
  - Cohere:    https://cohere.com/pricing
"""

import json
import re
import sys
import time
import hashlib
import argparse
from datetime import datetime, timezone
from pathlib import Path

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Missing dependencies. Run: pip install requests beautifulsoup4 lxml")
    sys.exit(1)


# ── Configuration ──
MODELS_JS_PATH = Path(__file__).parent.parent / "js" / "models.js"

HEADERS = {
    "User-Agent": "TokenCost-PriceCrawler/1.0 (contact@tokencost.app)",
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "en-US,en;q=0.9",
}

PROVIDERS = {
    "openai": {
        "name": "OpenAI",
        "urls": [
            "https://openai.com/api/pricing/",
        ],
    },
    "anthropic": {
        "name": "Anthropic",
        "urls": [
            "https://www.anthropic.com/pricing",
        ],
    },
    "google": {
        "name": "Google",
        "urls": [
            "https://ai.google.dev/pricing",
        ],
    },
    "deepseek": {
        "name": "DeepSeek",
        "urls": [
            "https://api-docs.deepseek.com/quick_start/pricing",
        ],
    },
    "mistral": {
        "name": "Mistral AI",
        "urls": [
            "https://mistral.ai/en/products/la-plateforme#pricing",
        ],
    },
    "cohere": {
        "name": "Cohere",
        "urls": [
            "https://cohere.com/pricing",
        ],
    },
    "meta": {
        "name": "Meta",
        "urls": [
            "https://www.llama.com/",
        ],
    },
}


class TokenCostCrawler:
    """Crawls AI provider pricing pages and extracts model prices."""

    def __init__(self, dry_run=False, verbose=True):
        self.dry_run = dry_run
        self.verbose = verbose
        self.updates = []
        self.errors = []
        self.session = requests.Session()
        self.session.headers.update(HEADERS)
        self.session.timeout = 15

    def log(self, msg):
        if self.verbose:
            print(f"  {msg}")

    def warn(self, msg):
        print(f"  ⚠ {msg}")
        self.errors.append(msg)

    # ── Generic price extractor ──
    def _extract_prices_from_html(self, html, provider_id):
        """Try to extract model prices from HTML using common patterns."""
        soup = BeautifulSoup(html, "lxml")
        text = soup.get_text(separator=" ", strip=True)

        results = []

        # Pattern 1: "$X.XX / 1M tokens" (most common)
        price_patterns = [
            # "$2.50 / 1M input tokens" style
            r'\$(\d+\.?\d*)\s*/\s*1M\s*(?:input|prompt|tokens)?\s*(?:tokens?)?.*?\$(\d+\.?\d*)\s*/\s*1M\s*(?:output|completion|generated)?\s*tokens?',
            # Table row with model name + prices
            r'(gpt-\S+|claude-\S+|gemini-\S+|deepseek-\S+|llama-\S+|mistral-\S+|command-\S+).*?\$(\d+\.?\d*).*?\$(\d+\.?\d*)',
            # Per-token pricing: $0.00015 / token
            r'\$(\d+\.\d+)\s*/\s*(?:1K|1000)\s*tokens',
        ]

        for pattern in price_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            if matches:
                for m in matches:
                    if len(m) == 3:  # model, input, output
                        results.append({
                            "model": m[0].strip(),
                            "inputPrice": float(m[1]),
                            "outputPrice": float(m[2]),
                        })
                    elif len(m) == 2:  # input, output
                        results.append({
                            "inputPrice": float(m[0]),
                            "outputPrice": float(m[1]),
                        })
                    elif len(m) == 1:  # single price
                        results.append({
                            "inputPrice": float(m[0]),
                        })

        # Pattern 2: Look for pricing tables
        tables = soup.find_all("table")
        for table in tables:
            rows = table.find_all("tr")
            for row in rows:
                cells = row.find_all(["td", "th"])
                cell_texts = [c.get_text(strip=True) for c in cells]
                # Look for cells with dollar amounts
                prices = []
                for ct in cell_texts:
                    pm = re.search(r'\$(\d+\.?\d*)', ct)
                    if pm:
                        prices.append(float(pm.group(1)))
                if len(prices) >= 2 and len(cell_texts) >= 3:
                    results.append({
                        "model": cell_texts[0],
                        "inputPrice": prices[0],
                        "outputPrice": prices[1] if len(prices) > 1 else prices[0] * 4,
                    })

        return results

    # ── Provider-specific scrapers ──
    def scrape_openai(self, html):
        """OpenAI pricing page has a structured table."""
        prices = self._extract_prices_from_html(html, "openai")
        # OpenAI uses "per 1M tokens" format
        return prices

    def scrape_anthropic(self, html):
        """Anthropic pricing page."""
        return self._extract_prices_from_html(html, "anthropic")

    def scrape_google(self, html):
        """Google AI pricing page."""
        soup = BeautifulSoup(html, "lxml")
        text = soup.get_text(separator=" ", strip=True)

        results = []
        # Gemini pricing: "$1.25 / 1M tokens (input), $10.00 / 1M tokens (output)"
        # "Gemini 2.5 Pro" model name pattern
        model_pattern = r'(Gemini\s+[\d.]+\s+\w+).*?input.*?\$(\d+\.?\d*).*?output.*?\$(\d+\.?\d*)'
        matches = re.findall(model_pattern, text, re.IGNORECASE)
        for m in matches:
            results.append({
                "model": m[0].strip(),
                "inputPrice": float(m[1]),
                "outputPrice": float(m[2]),
            })
        return results or self._extract_prices_from_html(html, "google")

    def scrape_deepseek(self, html):
        """DeepSeek API docs pricing section."""
        soup = BeautifulSoup(html, "lxml")
        text = soup.get_text(separator=" ", strip=True)

        results = []
        # DeepSeek uses "¥1 / 1M tokens" or "$0.14 / 1M tokens"
        # Pattern: "DeepSeek-V3" then prices
        patterns = [
            r'(DeepSeek[\s-]*\w+).*?(?:input|cache\s+hit).*?\$(\d+\.?\d*).*?(?:output).*?\$(\d+\.?\d*)',
            r'(deepseek[\s-]*\w+).*?\$(\d+\.?\d*)/1M.*?\$(\d+\.?\d*)/1M',
        ]
        for pattern in patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            for m in matches:
                results.append({
                    "model": m[0].strip(),
                    "inputPrice": float(m[1]),
                    "outputPrice": float(m[2]),
                })
        return results or self._extract_prices_from_html(html, "deepseek")

    def scrape_mistral(self, html):
        return self._extract_prices_from_html(html, "mistral")

    def scrape_cohere(self, html):
        return self._extract_prices_from_html(html, "cohere")

    def scrape_meta(self, html):
        """Meta/Llama pricing via Together AI or Replicate."""
        return self._extract_prices_from_html(html, "meta")

    # ── Fetch & parse ──
    def fetch_provider(self, provider_id):
        """Fetch pricing page and extract model prices."""
        provider = PROVIDERS.get(provider_id)
        if not provider:
            self.warn(f"Unknown provider: {provider_id}")
            return []

        self.log(f"Fetching {provider['name']} pricing...")

        all_prices = []
        for url in provider["urls"]:
            try:
                resp = self.session.get(url, timeout=20)
                resp.raise_for_status()

                scraper_method = getattr(self, f"scrape_{provider_id}", None)
                if scraper_method:
                    prices = scraper_method(resp.text)
                else:
                    prices = self._extract_prices_from_html(resp.text, provider_id)

                if prices:
                    self.log(f"  Found {len(prices)} price entries")
                    all_prices.extend(prices)
                else:
                    self.warn(f"  No prices extracted from {url} (page may have changed)")

            except requests.RequestException as e:
                self.warn(f"  Failed to fetch {url}: {e}")
            except Exception as e:
                self.warn(f"  Error parsing {url}: {e}")

        return all_prices

    # ── Generate models.js update ──
    def generate_price_update(self, provider_id, scraped_prices):
        """Generate JavaScript snippet with updated prices."""
        if not scraped_prices:
            return None

        lines = []
        lines.append(f"// Auto-generated price update for {PROVIDERS[provider_id]['name']}")
        lines.append(f"// Crawled at: {datetime.now(timezone.utc).isoformat()}")
        lines.append("")

        for price in scraped_prices:
            model_name = price.get("model", "unknown").lower().replace(" ", "-")
            inp = price.get("inputPrice")
            out = price.get("outputPrice")
            if inp is not None and out is not None:
                lines.append(
                    f"// {price.get('model', 'Unknown')}: "
                    f"${inp:.2f} input / ${out:.2f} output per 1M tokens"
                )

        lines.append("")
        lines.append("// Paste these prices into js/models.js under the appropriate provider section")
        return "\n".join(lines)

    # ── Main run ──
    def run(self, providers=None):
        """Fetch all or specified providers and generate updates."""
        target_providers = providers or list(PROVIDERS.keys())

        print(f"\n{'='*60}")
        print(f"TokenCost Price Crawler — {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"Targets: {', '.join(target_providers)}")
        print(f"{'='*60}\n")

        all_results = {}
        for pid in target_providers:
            prices = self.fetch_provider(pid)
            if prices:
                all_results[pid] = prices
            time.sleep(1)  # Be polite between requests

        # ── Summary ──
        print(f"\n{'='*60}")
        print(f"SUMMARY")
        print(f"{'='*60}")

        if not all_results:
            print("  No prices extracted. All pages may have changed format.")
            print("  Manual review required: check js/models.js against official docs.")
            return

        total_models = sum(len(v) for v in all_results.values())
        print(f"  Providers scraped: {len(all_results)}/{len(target_providers)}")
        print(f"  Models found: {total_models}")
        print(f"  Errors: {len(self.errors)}")

        # Print extracted prices
        print(f"\n  Extracted Prices:")
        for pid, prices in all_results.items():
            print(f"    {PROVIDERS[pid]['name']}:")
            for p in prices:
                print(f"      - {p.get('model', '?')}: ${p.get('inputPrice', '?')}/{p.get('outputPrice', '?')}")

        # Generate update snippet
        print(f"\n{'='*60}")
        print(f"UPDATE SNIPPET (review before applying)")
        print(f"{'='*60}\n")

        for pid, prices in all_results.items():
            snippet = self.generate_price_update(pid, prices)
            if snippet:
                print(snippet)
                print()

        if self.dry_run:
            print("[DRY RUN] No files modified.")
        else:
            print("Review the extracted prices above.")
            print("Manually update js/models.js with verified prices.")
            print("Tip: Set up a cron job to run this daily:")
            print("  0 9 * * * cd /path/to/tokencost && python crawler/crawler.py >> crawler/log.txt")

        # Return structured data for potential automated updates
        return all_results


def main():
    parser = argparse.ArgumentParser(
        description="TokenCost AI Model Price Crawler"
    )
    parser.add_argument(
        "--provider", "-p",
        help="Scrape a single provider (openai, anthropic, google, etc.)",
    )
    parser.add_argument(
        "--dry-run", "-n",
        action="store_true",
        help="Print results without generating update files",
    )
    parser.add_argument(
        "--quiet", "-q",
        action="store_true",
        help="Suppress verbose output",
    )
    parser.add_argument(
        "--schedule",
        action="store_true",
        help="Run continuously every 24 hours",
    )
    parser.add_argument(
        "--output",
        help="Output JSON file for structured results",
    )

    args = parser.parse_args()

    providers = [args.provider] if args.provider else None
    crawler = TokenCostCrawler(dry_run=args.dry_run, verbose=not args.quiet)

    if args.schedule:
        print("Starting scheduled crawler (runs every 24 hours)...")
        while True:
            results = crawler.run(providers)
            if args.output and results:
                with open(args.output, "w") as f:
                    json.dump(results, f, indent=2, default=str)
            print(f"\nNext run in 24 hours... (Ctrl+C to stop)")
            time.sleep(86400)
    else:
        results = crawler.run(providers)
        if args.output and results:
            out_path = Path(args.output)
            out_path.parent.mkdir(parents=True, exist_ok=True)
            with open(out_path, "w") as f:
                json.dump(results, f, indent=2, default=str)
            print(f"\nResults saved to {args.output}")


if __name__ == "__main__":
    main()
