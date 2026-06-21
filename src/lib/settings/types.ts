import { LucideIcon } from "lucide-react";
import { COLORS } from "./colors";
import { GlossaryTogglerType } from "../types";

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
     defaultGlossaryView: GlossaryTogglerType
}
export type DateFormat = "dd/MM/yyyy HH:mm:ss" | "MM/dd/yyyy HH:mm:ss" | "yyyy-MM-dd HH:mm:ss"
export type Theme = "dark" | "light" | "system";
export type ResolvedTheme = Exclude<Theme, "system">;
export type Color = keyof typeof COLORS;
export interface IThemeSettings {
     Icon: LucideIcon,
     theme: Theme
}