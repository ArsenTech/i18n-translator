import { LucideIcon } from "lucide-react";
import { COLORS } from "./colors";
import { GlossaryTogglerType } from "../types";
import { TranslationFormat } from "../types/enums";

export interface ISettings{
     currNamespaceOnly: boolean
     theme: Theme,
     color: Color,
     baseLang?: string,
     targetLang?: string,
     showLineNumbers: boolean,
     showSidebar: boolean,
     showGlossary: boolean,
     autoSave: boolean,
     defaultGlossaryView: GlossaryTogglerType,
     defaultFormat: TranslationFormat,
     checkUpdatesOnStartup: boolean
}
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