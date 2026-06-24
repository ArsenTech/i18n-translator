import { COLORS } from "@/lib/settings/colors";
import { DEFAULT_THEME_VALUES } from "@/lib/settings/constants";
import { Color, IThemeValues, ResolvedTheme, Theme } from "@/lib/settings/types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type ThemeProviderProps = {
     children: React.ReactNode;
};

type ThemeProviderState = {
     theme: Theme;
     resolvedTheme: ResolvedTheme | null;
     color: Color;
     setTheme: (theme: Theme) => void;
     setColor: (color: Color) => void;
     resetThemes: () => void;
     clearThemes: () => void
};

const ThemeProviderContext = createContext<ThemeProviderState | null>(null);

export function ThemeProvider({
     children,
}: ThemeProviderProps) {
     const [themes, setThemes] = useState<IThemeValues>(()=>{
          try {
               const raw = localStorage.getItem("app-themes")
               if (!raw) return DEFAULT_THEME_VALUES
               return { ...DEFAULT_THEME_VALUES, ...JSON.parse(raw) }
          } catch {
               return DEFAULT_THEME_VALUES
          }
     });
     const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme | null>(null);
     useEffect(() => {
          const root = document.documentElement;
          const media = window.matchMedia("(prefers-color-scheme: dark)");
          const applyTheme = (resolved: ResolvedTheme) => {
               root.classList.remove("light", "dark");
               root.classList.add(resolved);
               setResolvedTheme(resolved);
          };
          applyTheme(themes.theme === "system" ? media.matches ? "dark" : "light" : themes.theme);
          const handleChange = (e: MediaQueryListEvent) => {
               if (themes.theme === "system") 
                    applyTheme(e.matches ? "dark" : "light");
          };
          media.addEventListener("change", handleChange);
          return () => media.removeEventListener("change", handleChange);
     }, [themes.theme]);

     useEffect(() => {
          if (!resolvedTheme) return;
          const colorDef = COLORS[themes.color];
          if (!colorDef) {
               toast.error(`Invalid color "${themes.color}". Available: ${Object.keys(COLORS).join(", ")}`,{
                    id: "theme-error"
               });
               return;
          }
          const { charts, ...uiColor } = colorDef;
          const modeStyles = uiColor[resolvedTheme];
          if (!modeStyles) return;

          const root = document.documentElement;
          if (Array.isArray(charts)) 
               charts.forEach((v, i) =>root.style.setProperty(`--chart-${i + 1}`, v));

          const flatEntries = {
               ...modeStyles,
               ...Object.fromEntries(Object.entries(modeStyles.sidebar ?? {}).map(([k, v]) => [`sidebar-${k}`,v,])),
          };
          Object.entries(flatEntries).forEach(([key, value]) => {
               if (typeof value !== "string") return;
               root.style.setProperty(
                    `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`,
                    value
               );
          });
          root.dataset.themeColor = themes.color;
     }, [themes.color, resolvedTheme]);

     const value: ThemeProviderState = useMemo(()=>({
          theme: themes.theme,
          resolvedTheme,
          color: themes.color,
          setTheme: t => {
               const newValue: IThemeValues = {
                    ...themes,
                    theme: t
               }
               localStorage.setItem("app-themes",JSON.stringify(newValue));
               setThemes(newValue)
          },
          setColor: c => {
               const newValue: IThemeValues = {
                    ...themes,
                    color: c
               }
               localStorage.setItem("app-themes",JSON.stringify(newValue));
               setThemes(newValue)
          },
          resetThemes(){
               localStorage.setItem("app-themes",JSON.stringify(DEFAULT_THEME_VALUES));
               setThemes(DEFAULT_THEME_VALUES)
          },
          clearThemes() {
               localStorage.removeItem("app-themes");
               setThemes(DEFAULT_THEME_VALUES)
          },
     }),[themes, resolvedTheme]);
     return (
          <ThemeProviderContext.Provider value={value}>
               {children}
          </ThemeProviderContext.Provider>
     );
}

export const useTheme = () => {
     const ctx = useContext(ThemeProviderContext);
     if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
     return ctx;
};