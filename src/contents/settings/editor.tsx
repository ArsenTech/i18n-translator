import SettingsItem from "@/components/settings-item";
import SettingsOption from "@/components/settings-item/settings-option";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/context/settings";
import { useAppTranslation } from "@/context/translation";
import { Edit, Languages } from "lucide-react";
import { lazy, Suspense } from "react";

const LangSelector = lazy(()=>import("@/components/fields/lang-selector"))

export default function EditorSettings(){
     const {updateLangs} = useAppTranslation()
     const {settings, setSettings} = useSettings()
     return (
          <div className="space-y-2">
               <SettingsItem
                    Icon={Edit}
                    title="Editor Settings"
               >
                    <SettingsOption
                         title="Show current namespace only"
                         description="Toggle between current namespace or entire translation"
                         id="switch-mode"
                    >
                         <Switch
                              id="switch-mode"
                              checked={settings.currNamespaceOnly}
                              onCheckedChange={checked=>setSettings({currNamespaceOnly: checked})}     
                         />
                    </SettingsOption>
                    <SettingsOption
                         title="Show line numbers"
                         description="Show translation line numbers inside the table"
                         id="show-line-numbers"
                    >
                         <Switch
                              id="show-line-numbers"
                              checked={settings.showLineNumbers}
                              onCheckedChange={checked=>setSettings({showLineNumbers: checked})}     
                         />
                    </SettingsOption>
                    <SettingsOption
                         title="Show sidebar by default"
                         description="Show the tree sidebar everytime you enter the app"
                         id="show-sidebar"
                    >
                         <Switch
                              id="show-sidebar"
                              checked={settings.showSidebar}
                              onCheckedChange={checked=>setSettings({showSidebar: checked})}     
                         />
                    </SettingsOption>
                    <SettingsOption
                         title="Auto-save Translations"
                         description="Automatically save translations every time you save a string"
                         id="auto-save"
                    >
                         <Switch
                              id="auto-save"
                              checked={settings.autoSave}
                              onCheckedChange={checked=>setSettings({autoSave: checked})}
                         />
                    </SettingsOption>
                    <SettingsOption
                         title="Preserve Empty Translations"
                         description="Keep or maintain empty translations intact"
                         id="preserve-empty"
                    >
                         <Switch
                              id="preserve-empty"
                              checked={settings.preserveEmpty}
                              onCheckedChange={checked=>setSettings({preserveEmpty: checked})}
                         />
                    </SettingsOption>
               </SettingsItem>
               <SettingsItem
                    Icon={Languages}
                    title="Default Editor Language"
               >
                    <SettingsOption
                         title="Base Language"
                         description="Language used by default"
                         id="base"
                    >
                         <Suspense fallback={<Skeleton className="h-8 flex-1"/>}>
                              <LangSelector
                                   placeholder="Base Language"
                                   className="flex-1"
                                   value={settings.baseLang}
                                   onChange={lang=>{
                                        setSettings({baseLang: lang})
                                        updateLangs({base: lang})
                                   }}
                              />
                         </Suspense>
                    </SettingsOption>
                    <SettingsOption
                         title="Target Language"
                         description="Language you often translate to"
                         id="target"
                    >
                         <Suspense fallback={<Skeleton className="h-8 flex-1"/>}>
                              <LangSelector
                                   placeholder="Target Language"
                                   className="flex-1"
                                   value={settings.targetLang}
                                   onChange={lang=>{
                                        setSettings({targetLang: lang})
                                        updateLangs({target: lang})
                                   }}
                              />
                         </Suspense>
                    </SettingsOption>
               </SettingsItem>
          </div>
     )
}