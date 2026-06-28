import { Monitor, Sun, Moon } from "lucide-react"
import type { Color, IThemeSettings, IAppearance } from "@/lib/types/settings"

export const DEFAULT_APPEARANCE: IAppearance = {
     theme: "system",
     color: "yellow",
     brightness: 100,
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
     },
     grayscale: {
          light: "bg-neutral-500",
          dark: "bg-neutral-400",
          title: "Grayscale"
     }
}