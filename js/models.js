// AI Token Cost Analyzer - Model Pricing Database
// All prices in USD per 1M tokens unless otherwise noted
// Last updated: May 2026

const MODEL_DATA = {
  providers: [
    {
      id: 'openai',
      name: 'OpenAI',
      logo: 'O',
      color: '#10A37F',
      models: [
        {
          id: 'gpt-4o',
          name: 'GPT-4o',
          inputPrice: 2.50,
          outputPrice: 10.00,
          cachedInputPrice: 1.25,
          contextWindow: 128000,
          maxOutput: 16384,
          releaseDate: '2024-05',
          category: 'flagship',
          strengths: ['multimodal', 'fast', 'balanced'],
          description: 'Fast, intelligent, flexible GPT model. Vision, text, function calling.'
        },
        {
          id: 'gpt-4o-mini',
          name: 'GPT-4o Mini',
          inputPrice: 0.15,
          outputPrice: 0.60,
          cachedInputPrice: 0.075,
          contextWindow: 128000,
          maxOutput: 16384,
          releaseDate: '2024-07',
          category: 'small',
          strengths: ['cheap', 'fast', 'lightweight'],
          description: 'Small, affordable model for high-volume, simple tasks.'
        },
        {
          id: 'o3-mini',
          name: 'o3-mini',
          inputPrice: 1.10,
          outputPrice: 4.40,
          cachedInputPrice: 0.55,
          contextWindow: 200000,
          maxOutput: 100000,
          releaseDate: '2025-01',
          category: 'reasoning',
          strengths: ['reasoning', 'math', 'coding'],
          description: 'Fast, powerful reasoning model specialized in STEM and coding tasks.'
        },
        {
          id: 'o1',
          name: 'o1',
          inputPrice: 15.00,
          outputPrice: 60.00,
          cachedInputPrice: 7.50,
          contextWindow: 200000,
          maxOutput: 100000,
          releaseDate: '2024-12',
          category: 'reasoning',
          strengths: ['deep-reasoning', 'science', 'complex'],
          description: 'Deep reasoning model for complex scientific and mathematical problems.'
        },
        {
          id: 'gpt-4-turbo',
          name: 'GPT-4 Turbo',
          inputPrice: 10.00,
          outputPrice: 30.00,
          cachedInputPrice: null,
          contextWindow: 128000,
          maxOutput: 4096,
          releaseDate: '2023-11',
          category: 'turbo',
          strengths: ['vision', 'function-calling'],
          description: 'Previous generation turbo model with broad capabilities.'
        },
        {
          id: 'gpt-4',
          name: 'GPT-4',
          inputPrice: 30.00,
          outputPrice: 60.00,
          cachedInputPrice: null,
          contextWindow: 8192,
          maxOutput: 8192,
          releaseDate: '2023-03',
          category: 'legacy',
          strengths: ['reliable'],
          description: 'Original GPT-4 base model. Legacy pricing.'
        }
      ]
    },
    {
      id: 'anthropic',
      name: 'Anthropic',
      logo: 'A',
      color: '#D97706',
      models: [
        {
          id: 'claude-sonnet-4',
          name: 'Claude Sonnet 4',
          inputPrice: 3.00,
          outputPrice: 15.00,
          cachedInputPrice: 0.30,
          contextWindow: 200000,
          maxOutput: 128000,
          releaseDate: '2025-05',
          category: 'flagship',
          strengths: ['balanced', 'coding', 'safety'],
          description: 'Best balance of speed and intelligence. Great for coding and text.'
        },
        {
          id: 'claude-opus-4',
          name: 'Claude Opus 4',
          inputPrice: 15.00,
          outputPrice: 75.00,
          cachedInputPrice: 1.50,
          contextWindow: 200000,
          maxOutput: 32000,
          releaseDate: '2025-05',
          category: 'flagship',
          strengths: ['best-quality', 'complex-analysis'],
          description: 'Most intelligent model for complex analysis and hard tasks.'
        },
        {
          id: 'claude-haiku-3.5',
          name: 'Claude Haiku 3.5',
          inputPrice: 0.80,
          outputPrice: 4.00,
          cachedInputPrice: 0.08,
          contextWindow: 200000,
          maxOutput: 8192,
          releaseDate: '2024-10',
          category: 'small',
          strengths: ['fastest', 'cheap', 'lightweight'],
          description: 'Fastest Claude model. Ideal for high-throughput use cases.'
        }
      ]
    },
    {
      id: 'google',
      name: 'Google',
      logo: 'G',
      color: '#4285F4',
      models: [
        {
          id: 'gemini-2.5-pro',
          name: 'Gemini 2.5 Pro',
          inputPrice: 1.25,
          outputPrice: 10.00,
          cachedInputPrice: null,
          contextWindow: 1048576,
          maxOutput: 65536,
          releaseDate: '2025-03',
          category: 'flagship',
          strengths: ['long-context', 'multimodal', 'reasoning'],
          description: '1M context window. Exceptional for long documents and multimodal.'
        },
        {
          id: 'gemini-2.5-flash',
          name: 'Gemini 2.5 Flash',
          inputPrice: 0.15,
          outputPrice: 0.60,
          cachedInputPrice: null,
          contextWindow: 1048576,
          maxOutput: 65536,
          releaseDate: '2025-03',
          category: 'small',
          strengths: ['fast', 'cheap', 'long-context'],
          description: 'Affordable fast model with massive context window.'
        }
      ]
    },
    {
      id: 'deepseek',
      name: 'DeepSeek',
      logo: 'D',
      color: '#4F46E5',
      models: [
        {
          id: 'deepseek-v3',
          name: 'DeepSeek V3',
          inputPrice: 0.14,
          outputPrice: 0.28,
          cachedInputPrice: 0.014,
          contextWindow: 128000,
          maxOutput: 8192,
          releaseDate: '2025-03',
          category: 'flagship',
          strengths: ['cheapest', 'competitive', 'open-weight'],
          description: 'Extremely affordable flagship model. Best price/performance ratio.'
        },
        {
          id: 'deepseek-r1',
          name: 'DeepSeek R1',
          inputPrice: 0.55,
          outputPrice: 2.19,
          cachedInputPrice: null,
          contextWindow: 128000,
          maxOutput: 8192,
          releaseDate: '2025-01',
          category: 'reasoning',
          strengths: ['reasoning', 'math', 'open-weight'],
          description: 'Open-weight reasoning model competitive with o1 at fraction of cost.'
        }
      ]
    },
    {
      id: 'meta',
      name: 'Meta (via Together/Replicate)',
      logo: 'M',
      color: '#1877F2',
      models: [
        {
          id: 'llama-4-maverick',
          name: 'Llama 4 Maverick',
          inputPrice: 0.20,
          outputPrice: 0.60,
          cachedInputPrice: null,
          contextWindow: 1048576,
          maxOutput: 4096,
          releaseDate: '2025-04',
          category: 'flagship',
          strengths: ['open-weight', 'multimodal', 'long-context'],
          description: 'Open-weight multimodal model. 1M context. Strong all-around.'
        },
        {
          id: 'llama-4-scout',
          name: 'Llama 4 Scout',
          inputPrice: 0.10,
          outputPrice: 0.30,
          cachedInputPrice: null,
          contextWindow: 10485760,
          maxOutput: 4096,
          releaseDate: '2025-04',
          category: 'small',
          strengths: ['ultra-long-context', 'cheap', 'open-weight'],
          description: '10M token context window. Ideal for massive document processing.'
        }
      ]
    },
    {
      id: 'mistral',
      name: 'Mistral AI',
      logo: 'M',
      color: '#FF6B00',
      models: [
        {
          id: 'mistral-large',
          name: 'Mistral Large',
          inputPrice: 2.00,
          outputPrice: 6.00,
          cachedInputPrice: null,
          contextWindow: 256000,
          maxOutput: 8192,
          releaseDate: '2025-02',
          category: 'flagship',
          strengths: ['multilingual', 'coding', 'european'],
          description: 'Top-tier reasoning with native multilingual and coding proficiency.'
        },
        {
          id: 'mistral-small',
          name: 'Mistral Small',
          inputPrice: 0.10,
          outputPrice: 0.30,
          cachedInputPrice: null,
          contextWindow: 128000,
          maxOutput: 4096,
          releaseDate: '2025-02',
          category: 'small',
          strengths: ['cheap', 'fast', 'multilingual'],
          description: 'Cost-effective small model for simple tasks in any language.'
        }
      ]
    },
    {
      id: 'cohere',
      name: 'Cohere',
      logo: 'C',
      color: '#39594D',
      models: [
        {
          id: 'command-r-plus',
          name: 'Command R+',
          inputPrice: 2.50,
          outputPrice: 10.00,
          cachedInputPrice: null,
          contextWindow: 128000,
          maxOutput: 4096,
          releaseDate: '2024-04',
          category: 'flagship',
          strengths: ['rag', 'enterprise', 'tool-use'],
          description: 'Optimized for enterprise RAG, tool use, and multilingual tasks.'
        }
      ]
    }
  ],

  // Package / bundle comparisons
  bundles: [
    {
      name: 'OpenAI ChatGPT Plus',
      provider: 'openai',
      monthlyFee: 20,
      includesTokens: 'limited',
      includesModels: ['gpt-4o', 'gpt-4o-mini', 'o3-mini'],
      notes: 'Rate limits apply. Best for individual heavy users.'
    },
    {
      name: 'OpenAI ChatGPT Pro',
      provider: 'openai',
      monthlyFee: 200,
      includesTokens: 'unlimited',
      includesModels: ['gpt-4o', 'o1', 'o3-mini'],
      notes: 'Unlimited access. Best for power users and researchers.'
    },
    {
      name: 'Anthropic Claude Pro',
      provider: 'anthropic',
      monthlyFee: 20,
      includesTokens: 'limited',
      includesModels: ['claude-sonnet-4', 'claude-opus-4'],
      notes: '5x usage vs free. Best for Claude power users.'
    },
    {
      name: 'Anthropic Claude Max',
      provider: 'anthropic',
      monthlyFee: 100,
      includesTokens: 'limited',
      includesModels: ['claude-sonnet-4', 'claude-opus-4'],
      notes: '20x usage vs free. Best for teams.'
    },
    {
      name: 'Google Gemini Advanced',
      provider: 'google',
      monthlyFee: 19.99,
      includesTokens: 'limited',
      includesModels: ['gemini-2.5-pro'],
      notes: 'Part of Google One AI Premium. Includes 2TB storage.'
    }
  ],

  // Common use case token estimates
  useCases: [
    { name: 'Short chat message', inputTokens: 50, outputTokens: 150, frequency: 'per-request' },
    { name: 'Code generation (function)', inputTokens: 200, outputTokens: 500, frequency: 'per-request' },
    { name: 'Document summarization (10 pages)', inputTokens: 5000, outputTokens: 1000, frequency: 'per-doc' },
    { name: 'Blog post writing', inputTokens: 300, outputTokens: 1500, frequency: 'per-post' },
    { name: 'Code review (PR)', inputTokens: 8000, outputTokens: 2000, frequency: 'per-review' },
    { name: 'RAG query (with context)', inputTokens: 3000, outputTokens: 400, frequency: 'per-query' },
    { name: 'Image analysis + caption', inputTokens: 500, outputTokens: 200, frequency: 'per-image' },
    { name: 'Full codebase analysis', inputTokens: 50000, outputTokens: 8000, frequency: 'per-analysis' },
    { name: 'Chatbot daily avg (100 convos)', inputTokens: 20000, outputTokens: 30000, frequency: 'per-day' },
    { name: 'Production API (10K calls/day)', inputTokens: 1000000, outputTokens: 2000000, frequency: 'per-day' }
  ],

  // Historical price trends (for Pro users)
  priceHistory: [
    { modelId: 'gpt-4o', date: '2024-05-13', inputPrice: 5.00, outputPrice: 15.00 },
    { modelId: 'gpt-4o', date: '2024-09-26', inputPrice: 2.50, outputPrice: 10.00 },
    { modelId: 'gpt-4o-mini', date: '2024-07-18', inputPrice: 0.15, outputPrice: 0.60 },
    { modelId: 'gpt-4-turbo', date: '2023-11-06', inputPrice: 10.00, outputPrice: 30.00 },
    { modelId: 'gpt-4-turbo', date: '2024-04-09', inputPrice: 10.00, outputPrice: 30.00 },
    { modelId: 'gpt-4', date: '2023-03-14', inputPrice: 30.00, outputPrice: 60.00 },
    { modelId: 'gpt-4-32k', date: '2023-06-13', inputPrice: 60.00, outputPrice: 120.00 },
    { modelId: 'claude-sonnet-4', date: '2025-05-22', inputPrice: 3.00, outputPrice: 15.00 },
    { modelId: 'claude-opus-4', date: '2025-05-22', inputPrice: 15.00, outputPrice: 75.00 },
    { modelId: 'claude-haiku-3.5', date: '2024-10-22', inputPrice: 0.80, outputPrice: 4.00 },
    { modelId: 'gemini-2.5-pro', date: '2025-03-25', inputPrice: 1.25, outputPrice: 10.00 },
    { modelId: 'gemini-2.5-flash', date: '2025-03-25', inputPrice: 0.15, outputPrice: 0.60 },
    { modelId: 'deepseek-v3', date: '2025-03-26', inputPrice: 0.14, outputPrice: 0.28 },
    { modelId: 'deepseek-r1', date: '2025-01-20', inputPrice: 0.55, outputPrice: 2.19 },
  ]
};

// Utility functions
function findModelById(modelId) {
  for (const provider of MODEL_DATA.providers) {
    const model = provider.models.find(m => m.id === modelId);
    if (model) return { ...model, provider: provider.name, providerColor: provider.color };
  }
  return null;
}

function getAllModels() {
  const all = [];
  for (const provider of MODEL_DATA.providers) {
    for (const model of provider.models) {
      all.push({ ...model, provider: provider.name, providerId: provider.id, providerColor: provider.color });
    }
  }
  return all;
}

function calculateCost(modelId, inputTokens, outputTokens, useCachedInput = false) {
  const model = findModelById(modelId);
  if (!model) return null;

  const effectiveInputPrice = (useCachedInput && model.cachedInputPrice != null)
    ? model.cachedInputPrice
    : model.inputPrice;

  const inputCost = (inputTokens / 1000000) * effectiveInputPrice;
  const outputCost = (outputTokens / 1000000) * model.outputPrice;
  const totalCost = inputCost + outputCost;

  return {
    model: model.name,
    provider: model.provider,
    inputTokens,
    outputTokens,
    inputCost: Math.round(inputCost * 10000) / 10000,
    outputCost: Math.round(outputCost * 10000) / 10000,
    totalCost: Math.round(totalCost * 10000) / 10000,
    usedCachedInput: useCachedInput && model.cachedInputPrice != null
  };
}

function recommendModels(inputTokens, outputTokens, dailyCalls, budget = null) {
  const allModels = getAllModels();
  const results = [];

  for (const model of allModels) {
    const dailyInput = inputTokens * dailyCalls;
    const dailyOutput = outputTokens * dailyCalls;
    const cost = calculateCost(model.id, dailyInput, dailyOutput);

    results.push({
      ...model,
      dailyCost: cost.totalCost,
      monthlyCost: Math.round(cost.totalCost * 30 * 100) / 100,
      yearlyCost: Math.round(cost.totalCost * 365 * 100) / 100
    });
  }

  results.sort((a, b) => a.monthlyCost - b.monthlyCost);

  if (budget !== null) {
    return results.filter(r => r.monthlyCost <= budget);
  }

  return results;
}

function compareModels(modelIds, inputTokens, outputTokens, callsPerDay = 1) {
  const results = [];
  for (const id of modelIds) {
    const cost = calculateCost(id, inputTokens * callsPerDay, outputTokens * callsPerDay);
    if (cost) {
      cost.monthlyCost = Math.round(cost.totalCost * 30 * 100) / 100;
      cost.yearlyCost = Math.round(cost.totalCost * 365 * 100) / 100;
      cost.callsPerDay = callsPerDay;
      results.push(cost);
    }
  }
  return results;
}
