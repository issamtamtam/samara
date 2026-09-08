import { createOpenRouter } from "@openrouter/ai-sdk-provider";

// Create OpenRouter provider instance
const openRouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Export available OpenRouter models
export const openRouterModels = {
  "anthropic/claude-3-haiku": openRouter("anthropic/claude-3-haiku"),
  "meta-llama/llama-3.1-8b-instruct": openRouter("meta-llama/llama-3.1-8b-instruct"),
};

// Default model for customer service
export const DEFAULT_OPENROUTER_MODEL = "anthropic/claude-3-haiku";

/**
 * Get language model for the given model ID.
 * If the model ID is an OpenRouter model, use OpenRouter provider.
 * Otherwise, fall back to the default Vercel AI Gateway.
 */
export function getLanguageModel(modelId: string) {
  // Check if it's an OpenRouter model
  if (modelId.startsWith("anthropic/") || modelId.startsWith("meta-llama/")) {
    return openRouterModels[modelId as keyof typeof openRouterModels] || 
           openRouterModels[DEFAULT_OPENROUTER_MODEL as keyof typeof openRouterModels];
  }
  
  // Otherwise use the default gateway
  return openRouter.languageModel(modelId);
}

export function getOpenRouterLanguageModel(modelId: string = DEFAULT_OPENROUTER_MODEL) {
  // Direct model instances for known OpenRouter models
  if (modelId === "anthropic/claude-3-haiku") {
    return openRouterModels["anthropic/claude-3-haiku"];
  }
  if (modelId === "meta-llama/llama-3.1-8b-instruct") {
    return openRouterModels["meta-llama/llama-3.1-8b-instruct"];
  }
  // Fallback to default
  return openRouterModels[DEFAULT_OPENROUTER_MODEL as keyof typeof openRouterModels];
}

export { openRouter };
