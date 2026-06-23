import { DEFAULT_PROVIDER_VALUES, DEFAULT_SETTINGS } from "@/lib/settings/constants"
import { IProviderValues, ISettings } from "@/lib/settings/types";
import { createContext, useContext, useMemo, useState } from "react";

interface SettingsContextValue{
     settings: ISettings,
     setSettings: (overrides: Partial<ISettings>) => void,
     providers: IProviderValues,
     setProviders: (overrides: Partial<IProviderValues>) => void,
}
const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: React.ReactNode }){
     const [settings, setSettings] = useState<ISettings>(()=>{
          try {
               const raw = localStorage.getItem("app-settings")
               if (!raw) return DEFAULT_SETTINGS
               return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
          } catch {
               return DEFAULT_SETTINGS
          }
     });
     const [providers, setProviders] = useState<IProviderValues>(()=>{
          try {
               const raw = localStorage.getItem("auto-translation-settings")
               if (!raw) return DEFAULT_PROVIDER_VALUES
               return { ...DEFAULT_PROVIDER_VALUES, ...JSON.parse(raw) }
          } catch {
               return DEFAULT_PROVIDER_VALUES
          }
     })
     const values: SettingsContextValue = useMemo(()=>({
          settings,
          setSettings: (overrides: Partial<ISettings>) => {
               const newValues: ISettings = {
                    ...settings,
                    ...overrides
               };
               localStorage.setItem("app-settings",JSON.stringify(newValues))
               setSettings(newValues)
          },
          providers,
          setProviders: (overrides: Partial<IProviderValues>) => {
               const newValues: IProviderValues = {
                    ...providers,
                    ...overrides
               };
               localStorage.setItem("auto-translation-settings",JSON.stringify(newValues));
               setProviders(newValues)
          }
     }),[settings, providers])
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