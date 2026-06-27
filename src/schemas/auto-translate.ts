import { RESOURCE_TYPE } from "@/lib/constants/items"
import type { TFunction } from "i18next"
import * as z from "zod"

const translationTargetField = (t: TFunction<"validation">) => z.enum([...RESOURCE_TYPE], t("translation-target"))

export const providerField = z.enum([
     "google-translate",
     "gemini",
     "libretranslate",
     "llama-ai"
])

export const getAutoTranslateSchema = (t: TFunction<"validation">) => z.discriminatedUnion("provider", [
     z.object({
          provider: z.literal("google-translate"),
          target: translationTargetField(t),
     }),
     z.object({
          provider: z.literal("gemini"),
          target: translationTargetField(t),
          apiKey: z.string().min(1,t("gemini-api")),
     }),
     z.object({
          provider: z.literal("libretranslate"),
          target: translationTargetField(t),
          serverURL: z.url(t("libre-translate-url")),
          apiKey: z.string().optional(),
     }),
     z.object({
          provider: z.literal("llama-ai"),
          target: translationTargetField(t),
          endpoint: z.string().min(1,t("llama.endpoint")),
          model: z.string().min(1,t("llama.model")),
     }),
])