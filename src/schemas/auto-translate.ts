import * as z from "zod"

const translationTargetField = z.enum(["key","namespace","translation"], "Select the translation target to Auto-Translate")

export const providerField = z.enum([
     "google-translate",
     "gemini",
     "libretranslate",
     "llama-ai"
])

export const AutoTranslateSchema = z.discriminatedUnion("provider", [
     z.object({
          provider: z.literal("google-translate"),
          target: translationTargetField,
     }),
     z.object({
          provider: z.literal("gemini"),
          target: translationTargetField,
          apiKey: z.string().min(1,"Please enter the Gemini API Key"),
     }),
     z.object({
          provider: z.literal("libretranslate"),
          target: translationTargetField,
          serverURL: z.url("Enter the valid Libre Translate Server URL"),
          apiKey: z.string().optional(),
     }),
     z.object({
          provider: z.literal("llama-ai"),
          target: translationTargetField,
          endpoint: z.string().min(1,"Please enter the Llama AI endpoint"),
          model: z.string().min(1,"Please enter the Llama AI model"),
     }),
])