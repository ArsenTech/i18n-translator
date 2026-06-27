import SettingsItem from "@/components/settings-item";
import SettingsOption from "@/components/settings-item/settings-option";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/context/settings";
import { useAppTranslation } from "@/context/translation";
import { Edit, Languages } from "lucide-react";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

const LangSelector = lazy(()=>import("@/components/fields/lang-selector"))

export default function EditorSettings(){
     const {t} = useTranslation("settings")
     const {updateLangs} = useAppTranslation()
     const {settings, setSettings} = useSettings()
     return (
          <div className="space-y-2">
               <SettingsItem
                    Icon={Edit}
                    title={t("editor.title")}
               >
                    <SettingsOption
                         title={t("editor.curr-namespace-only.title")}
                         description={t("editor.curr-namespace-only.desc")}
                         id="switch-mode"
                    >
                         <Switch
                              id="switch-mode"
                              checked={settings.currNamespaceOnly}
                              onCheckedChange={checked=>setSettings({currNamespaceOnly: checked})}     
                         />
                    </SettingsOption>
                    <SettingsOption
                         title={t("editor.line-numbers.title")}
                         description={t("editor.line-numbers.desc")}
                         id="show-line-numbers"
                    >
                         <Switch
                              id="show-line-numbers"
                              checked={settings.showLineNumbers}
                              onCheckedChange={checked=>setSettings({showLineNumbers: checked})}     
                         />
                    </SettingsOption>
                    <SettingsOption
                         title={t("editor.sidebar.title")}
                         description={t("editor.sidebar.desc")}
                         id="show-sidebar"
                    >
                         <Switch
                              id="show-sidebar"
                              checked={settings.showSidebar}
                              onCheckedChange={checked=>setSettings({showSidebar: checked})}     
                         />
                    </SettingsOption>
                    <SettingsOption
                         title={t("editor.auto-save.title")}
                         description={t("editor.auto-save.desc")}
                         id="auto-save"
                    >
                         <Switch
                              id="auto-save"
                              checked={settings.autoSave}
                              onCheckedChange={checked=>setSettings({autoSave: checked})}
                         />
                    </SettingsOption>
                    <SettingsOption
                         title={t("editor.preserve-empty.title")}
                         description={t("editor.preserve-empty.desc")}
                         id="preserve-empty"
                    >
                         <Switch
                              id="preserve-empty"
                              checked={settings.preserveEmpty}
                              onCheckedChange={checked=>setSettings({preserveEmpty: checked})}
                         />
                    </SettingsOption>
                    <SettingsOption
                         title={t("editor.auto-detect-base.title")}
                         description={t("editor.auto-detect-base.desc")}
                         id="auto-detect-base-lang"
                    >
                         <Switch
                              id="auto-detect-base-lang"
                              checked={settings.autoDetectBaseLang}
                              onCheckedChange={checked =>
                                   setSettings({ autoDetectBaseLang: checked })
                              }
                         />
                    </SettingsOption>
               </SettingsItem>
               <SettingsItem
                    Icon={Languages}
                    title={t("default-editor-lang.title")}
               >
                    <SettingsOption
                         title={t("default-editor-lang.base.title")}
                         description={t("default-editor-lang.base.desc")}
                         id="base"
                    >
                         <Suspense fallback={<Skeleton className="h-8 flex-1"/>}>
                              <LangSelector
                                   placeholder={t("default-editor-lang.base.title")}
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
                         title={t("default-editor-lang.target.title")}
                         description={t("default-editor-lang.target.desc")}
                         id="target"
                    >
                         <Suspense fallback={<Skeleton className="h-8 flex-1"/>}>
                              <LangSelector
                                   placeholder={t("default-editor-lang.target.title")}
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