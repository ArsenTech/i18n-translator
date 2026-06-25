import { COLORS } from "@/lib/constants/colors";
import { FILE_FORMATS } from "@/lib/constants/items";
import { z } from "zod";

const colorKeys = Object.keys(COLORS) as (keyof typeof COLORS)[]

export const AppearanceSchema = z.object({
     theme: z.enum(["dark", "light", "system"],"Theme is required"),
     color: z.enum([...colorKeys],"Color is required"),
     brightness: z.number().min(0).max(100),
});

export const SettingsSchema = z.object({
     currNamespaceOnly: z.boolean(),
     baseLang: z.string().optional(),
     targetLang: z.string().optional(),
     showLineNumbers: z.boolean(),
     showSidebar: z.boolean(),
     showGlossary: z.boolean(),
     autoSave: z.boolean(),
     defaultGlossaryView: z.enum(["few", "all"],"Glossary View should be either few or all"),
     defaultFormat: z.enum([...FILE_FORMATS],"File Format is required"),
     checkUpdatesOnStartup: z.boolean(),
     compactToolbar: z.boolean(),
     androidTranslatable: z.boolean(),
     androidTranslatableCol: z.boolean(),
     xliffAutoDetect: z.boolean(),
     xliffPreserveMeta: z.boolean(),
     preserveEmpty: z.boolean(),
     autoDetectBaseLang: z.boolean(),
});

export const ProviderSchema = z.object({
     geminiApi: z.string().max(200),
     libreTranslateServer: z.string().max(200),
     libreTranslateApi: z.string().max(200),
     llamaEndpoint: z.string().max(200),
     llamaModel: z.string().max(200),
});

export const ToolbarSchema = z.object({
     newFile: z.boolean(),
     openFile: z.boolean(),
     saveFile: z.boolean(),
     find: z.boolean(),
     findMissing: z.boolean(),
     replace: z.boolean(),
     batchRename: z.boolean(),
     selectUntranslated: z.boolean(),
     addToGlossary: z.boolean(),
     autoTranslate: z.boolean(),
     validateKeys: z.boolean(),
     removeUnusedKeys: z.boolean(),
     transliterate: z.boolean(),
     glossaryManager: z.boolean(),
     spellCheck: z.boolean(),
});

export const SettingsMetadataSchema = z.object({
     schemaVersion: z.literal(1),
     name: z.string(),
     version: z.string(),
     identifier: z.string(),
     settings: SettingsSchema,
     appearance: AppearanceSchema,
     providers: ProviderSchema,
     toolbars: ToolbarSchema,
});