import { DEFAULT_SETTINGS } from "@/lib/settings/constants"
import { ISettings } from "@/lib/settings/types";
import { createContext, useContext, useMemo, useState } from "react";

interface SettingsContextValue{
     settings: ISettings,
     setSettings: (overrides: Partial<ISettings>) => void,
}
const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: React.ReactNode }){
     const [settings, setSettings] = useState<ISettings>(()=>{
          try {
               const raw = localStorage.getItem("clamav-settings")
               if (!raw) return DEFAULT_SETTINGS
               return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
          } catch {
               return DEFAULT_SETTINGS
          }
     });
     const values: SettingsContextValue = useMemo(()=>({
          settings,
          setSettings: (overrides: Partial<ISettings>) => {
               const newValues: ISettings = {
                    ...settings,
                    ...overrides
               }; localStorage.setItem("clamav-settings",JSON.stringify(newValues))
               setSettings(newValues)
          },
     }),[settings])
     return (
          <SettingsContext.Provider value={values}>
               {children}
          </SettingsContext.Provider>
     )
}

export function useSettings() {
     const ctx = useContext(SettingsContext);
     if (!ctx) {
          throw new Error("useSettings must be used inside SettingsProvider");
     }
     return ctx;
}