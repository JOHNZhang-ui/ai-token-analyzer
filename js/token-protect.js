/**
 * Token Protect — Prevent browser auto-translation of "Token" to "代币"
 * 
 * Adds class="notranslate" to elements containing the word "Token"/"Tokens"
 * so Chrome/Edge built-in translation skips them.
 * The rest of the page remains translatable.
 */
(function () {
  if (typeof document === 'undefined') return;

  // Regex: match "Token" or "Tokens" as a standalone word (case-insensitive)
  // Skip if already wrapped in .notranslate
  var TOKEN_RE = /\b(Tokens?|tokens?)\b/;

  function protectTextNodes(root) {
    var walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          // Skip if parent already has notranslate
          var parent = node.parentElement;
          if (parent && (
            parent.classList.contains('notranslate') ||
            parent.getAttribute('translate') === 'no' ||
            parent.closest('.notranslate') ||
            parent.closest('[translate="no"]')
          )) {
            return NodeFilter.FILTER_REJECT;
          }
          // Only process text nodes containing "token"
          if (TOKEN_RE.test(node.textContent)) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_SKIP;
        }
      }
    );

    var nodesToReplace = [];
    var node;
    while ((node = walker.nextNode())) {
      nodesToReplace.push(node);
    }

    for (var i = 0; i < nodesToReplace.length; i++) {
      var textNode = nodesToReplace[i];
      var text = textNode.textContent;
      var fragment = document.createDocumentFragment();

      var lastIndex = 0;
      var match;
      var re = new RegExp(TOKEN_RE.source, 'gi');

      while ((match = re.exec(text)) !== null) {
        // Append text before match
        if (match.index > lastIndex) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        }
        // Wrap matched "Token"/"Tokens"/etc in notranslate span
        var span = document.createElement('span');
        span.className = 'notranslate';
        span.setAttribute('translate', 'no');
        span.textContent = match[0];
        fragment.appendChild(span);
        lastIndex = re.lastIndex;
      }

      // Append remaining text
      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
      }

      if (fragment.childNodes.length > 0) {
        textNode.parentNode.replaceChild(fragment, textNode);
      }
    }
  }

  function init() {
    protectTextNodes(document.body);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Also protect dynamically added content
  if (typeof MutationObserver !== 'undefined') {
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var mutation = mutations[i];
        for (var j = 0; j < mutation.addedNodes.length; j++) {
          var node = mutation.addedNodes[j];
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Skip .notranslate subtrees
            if (!node.classList.contains('notranslate') && node.getAttribute('translate') !== 'no') {
              protectTextNodes(node);
            }
          }
        }
      }
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
})();
