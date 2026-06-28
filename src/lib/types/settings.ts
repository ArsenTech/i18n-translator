import type { LucideIcon } from "lucide-react";
import { COLORS } from "../constants/colors";
import { GlossaryTogglerType } from "./string-unions";
import { TranslationFormat } from "./enums";
import { DEFAULT_SETTINGS } from "../constants/settings/defaults";

export interface ISettings{
     currNamespaceOnly: boolean
     baseLang?: string,
     targetLang?: string,
     showLineNumbers: boolean,
     showSidebar: boolean,
     showGlossary: boolean,
     autoSave: boolean,
     defaultGlossaryView: GlossaryTogglerType,
     defaultFormat: TranslationFormat,
     checkUpdatesOnStartup: boolean,
     compactToolbar: boolean,
     androidTranslatable: boolean,
     androidTranslatableCol: boolean,
     xliffAutoDetect: boolean,
     xliffPreserveMeta: boolean,
     preserveEmpty: boolean,
     autoDetectBaseLang: boolean
}
export interface IAppearance{
     theme: Theme,
     color: Color,
     brightness: number,
}
type ToolbarItems = "newFile" | "openFile" | "saveFile" | "find" | "findMissing" | "replace" | "batchRename" | "selectUntranslated" | "addToGlossary" | "autoTranslate" | "validateKeys" | "removeUnusedKeys" | "transliterate" | "glossaryManager" | "spellCheck"
export type ToolbarValues = Record<ToolbarItems,boolean>
export interface IProviderValues{
     geminiApi: string,
     libreTranslateServer: string,
     libreTranslateApi: string,
     llamaEndpoint: string,
     llamaModel: string
}
export type Theme = "dark" | "light" | "system";
export type ResolvedTheme = Exclude<Theme, "system">;
export type Color = keyof typeof COLORS;
export interface IThemeSettings {
     Icon: LucideIcon,
     theme: Theme
}
export interface ISettingsMetadata {
     schemaVersion: 1;

     name: string;
     version: string;
     identifier: string;

     settings: ISettings;
     appearance: IAppearance;
     providers: IProviderValues;
     toolbars: ToolbarValues;
}
export type SettingsKey = keyof typeof DEFAULT_SETTINGS