import { Monitor, Sun, Moon } from "lucide-react"
import { Color, IProviderValues, ISettings, IThemeSettings } from "./types"
import { TranslationFormat } from "../types/enums"

export const DEFAULT_SETTINGS: ISettings = {
     currNamespaceOnly: true,
     theme: "system",
     color: "yellow",
     showLineNumbers: false,
     showSidebar: true,
     showGlossary: true,
     autoSave: false,
     defaultGlossaryView: "few",
     defaultFormat: TranslationFormat.Json,
     checkUpdatesOnStartup: false,
     compactToolbar: false
}
export const DEFAULT_PROVIDER_VALUES: IProviderValues = {
     geminiApi: "",
     libreTranslateApi: "",
     libreTranslateServer: "",
     llamaEndpoint: "",
     llamaModel: ""
}
export const THEME_SETTINGS: IThemeSettings[] = [
     { Icon: Monitor, theme: "system" },
     { Icon: Sun, theme: "light" },
     { Icon: Moon, theme: "dark" }
]
export const AVAILABLE_COLORS: Record<Color,{
     light: string,
     dark: string,
     title: string
}> = {
     yellow: {
          light: "bg-yellow-500",
          dark: "bg-yellow-400",
          title: "Yellow"
     },
     skyBlue: {
          light: "bg-sky-500",
          dark: "bg-sky-400",
          title: "Sky Blue"
     },
     lime: {
          light: "bg-lime-500",
          dark: "bg-lime-400",
          title: "Lime"
     },
     rose: {
          light: "bg-rose-500",
          dark: "bg-rose-400",
          title: "Rose"
     },
     violet: {
          light: "bg-violet-500",
          dark: "bg-violet-400",
          title: "Violet"
     }
}