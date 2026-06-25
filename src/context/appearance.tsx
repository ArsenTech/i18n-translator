import { COLORS } from "@/lib/constants/colors";
import { DEFAULT_APPEARANCE } from "@/lib/constants/settings";
import type { Color, IAppearance, ResolvedTheme, Theme } from "@/lib/types/settings";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

interface AppearanceProviderProps{
     children: React.ReactNode;
};
interface AppearanceProviderState{
     theme: Theme;
     resolvedTheme: ResolvedTheme | null;
     color: Color;
     brightness: number,
     setTheme: (theme: Theme) => void;
     setColor: (color: Color) => void;
     setBrightness: (brightness: number) => void;
     resetValues: () => void;
     clearValues: () => void
};

const AppearanceProviderContext = createContext<AppearanceProviderState | null>(null);

export function AppearanceProvider({
     children,
}: AppearanceProviderProps) {
     const [appearance, setAppearance] = useState<IAppearance>(()=>{
          try {
               const raw = localStorage.getItem("app-appearance")
               if (!raw) return DEFAULT_APPEARANCE
               return { ...DEFAULT_APPEARANCE, ...JSON.parse(raw) }
          } catch {
               return DEFAULT_APPEARANCE
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
          applyTheme(appearance.theme === "system" ? media.matches ? "dark" : "light" : appearance.theme);
          const handleChange = (e: MediaQueryListEvent) => {
               if (appearance.theme === "system") 
                    applyTheme(e.matches ? "dark" : "light");
          };
          media.addEventListener("change", handleChange);
          return () => media.removeEventListener("change", handleChange);
     }, [appearance.theme]);

     useEffect(() => {
          if (!resolvedTheme) return;
          const colorDef = COLORS[appearance.color];
          if (!colorDef) {
               toast.error(`Invalid color "${appearance.color}". Available: ${Object.keys(COLORS).join(", ")}`,{
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
          root.dataset.themeColor = appearance.color;
     }, [appearance.color, resolvedTheme]);

     const value: AppearanceProviderState = useMemo(()=>({
          theme: appearance.theme,
          resolvedTheme,
          color: appearance.color,
          brightness: appearance.brightness,
          setTheme: t => {
               const newValue: IAppearance = {
                    ...appearance,
                    theme: t
               }
               localStorage.setItem("app-appearance",JSON.stringify(newValue));
               setAppearance(newValue)
          },
          setColor: c => {
               const newValue: IAppearance = {
                    ...appearance,
                    color: c
               }
               localStorage.setItem("app-appearance",JSON.stringify(newValue));
               setAppearance(newValue)
          },
          setBrightness: b => {
               if(b<0 || b>100) return;
               const newValue: IAppearance = {
                    ...appearance,
                    brightness: b
               }
               localStorage.setItem("app-appearance",JSON.stringify(newValue));
               setAppearance(newValue)
          },
          resetValues(){
               localStorage.setItem("app-appearance",JSON.stringify(DEFAULT_APPEARANCE));
               setAppearance(DEFAULT_APPEARANCE)
          },
          clearValues() {
               localStorage.removeItem("app-appearance");
               setAppearance(DEFAULT_APPEARANCE)
          },
     }),[appearance, resolvedTheme]);
     return (
          <AppearanceProviderContext.Provider value={value}>
               {children}
          </AppearanceProviderContext.Provider>
     );
}

export const useAppearance = () => {
     const ctx = useContext(AppearanceProviderContext);
     if (!ctx) throw new Error("useAppearance must be used within AppearanceProvider");
     return ctx;
};