import { DEFAULT_SETTINGS } from "@/lib/constants/settings/defaults";
import { initializeValue } from "@/lib/helpers";
import type { IProviderValues, ISettings, SettingsKey, ToolbarValues } from "@/lib/types/settings";
import { createContext, useContext, useMemo, useState } from "react";

interface SettingsContextValue{
     settings: ISettings,
     setSettings: (overrides: Partial<ISettings>) => void,
     providers: IProviderValues,
     setProviders: (overrides: Partial<IProviderValues>) => void,
     toolbars: ToolbarValues,
     setToolbars: (overrides: Partial<ToolbarValues>) => void,
     resetAll: () => void,
     clearAll: () => void
}
const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: React.ReactNode }){
     const [settings, setSettings] = useState<ISettings>(initializeValue("app-settings"));
     const [providers, setProviders] = useState<IProviderValues>(initializeValue("auto-translation-settings"))
     const [toolbars, setToolbars] = useState<ToolbarValues>(initializeValue("toolbar-settings"))
     const reset = () => {
          setSettings(DEFAULT_SETTINGS["app-settings"])
          setProviders(DEFAULT_SETTINGS["auto-translation-settings"])
          setToolbars(DEFAULT_SETTINGS["toolbar-settings"])
     }
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
          },
          toolbars,
          setToolbars: (overrides: Partial<ToolbarValues>) => {
               const newValues: ToolbarValues = {
                    ...toolbars,
                    ...overrides
               };
               localStorage.setItem("toolbar-settings",JSON.stringify(newValues));
               setToolbars(newValues)
          },
          resetAll: () => {
               for(const key in DEFAULT_SETTINGS) localStorage.setItem(key,JSON.stringify(DEFAULT_SETTINGS[key as SettingsKey])); 
               reset()
          },
          clearAll: () => {
               for(const key in DEFAULT_SETTINGS) localStorage.removeItem(key)
               reset()
          }
     }),[settings, providers, toolbars])
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