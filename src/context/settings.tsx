import { DEFAULT_PROVIDER_VALUES, DEFAULT_SETTINGS } from "@/lib/constants/settings"
import { DEFAULT_TOOLBAR_SETTINGS } from "@/lib/constants/toolbars";
import type { IProviderValues, ISettings, ToolbarValues } from "@/lib/types/settings";
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
     const [toolbars, setToolbars] = useState<ToolbarValues>(()=>{
          try {
               const raw = localStorage.getItem("toolbar-settings")
               if (!raw) return DEFAULT_TOOLBAR_SETTINGS
               return { ...DEFAULT_TOOLBAR_SETTINGS, ...JSON.parse(raw) }
          } catch {
               return DEFAULT_TOOLBAR_SETTINGS
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
               localStorage.setItem("app-settings",JSON.stringify(DEFAULT_SETTINGS));
               setSettings(DEFAULT_SETTINGS)
               localStorage.setItem("auto-translation-settings",JSON.stringify(DEFAULT_PROVIDER_VALUES))
               setProviders(DEFAULT_PROVIDER_VALUES)
               localStorage.setItem("toolbar-settings",JSON.stringify(DEFAULT_TOOLBAR_SETTINGS))
               setToolbars(DEFAULT_TOOLBAR_SETTINGS)
          },
          clearAll: () => {
               setSettings(DEFAULT_SETTINGS)
               setProviders(DEFAULT_PROVIDER_VALUES)
               setToolbars(DEFAULT_TOOLBAR_SETTINGS);
               ["app-settings","auto-translation-settings","toolbar-settings"].forEach(val=>localStorage.removeItem(val))
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