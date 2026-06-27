import SettingsOption from "@/components/settings-item/settings-option";
import { useSettings } from "@/context/settings";
import type { GlossaryTogglerType } from "@/lib/types/string-unions";
import SettingsItem from "@/components/settings-item";
import { BookOpen } from "lucide-react";
import { useGlossary } from "@/context/glossary";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";

const SelectorField = lazy(()=>import("@/components/fields/selector"))

export default function GlossarySettings(){
     const {t} = useTranslation("settings")
     const {settings, setSettings} = useSettings()
     const {setShowType} = useGlossary()
     return (
          <div className="space-y-2">
               <SettingsItem
                    title={t("glossary.title")}
                    Icon={BookOpen}
               >
                    <SettingsOption
                         title={t("glossary.default-view.title")}
                         description={t("glossary.default-view.desc")}
                         id="glossary-view"
                    >
                         <Suspense fallback={<Skeleton className="h-8 w-full max-w-32"/>}>
                              <SelectorField
                                   name="glossary-view"
                                   value={settings.defaultGlossaryView}
                                   onChange={val=>{
                                        const newVal = val as GlossaryTogglerType
                                        setSettings({defaultGlossaryView: newVal})
                                        setShowType(newVal)
                                   }}
                                   items={[
                                        {value: "few", label: t("glossary.default-view.show-few")},
                                        {value: "all", label: t("glossary.default-view.show-all")}
                                   ]}
                              />
                         </Suspense>
                    </SettingsOption>
                    <SettingsOption
                         title={t("glossary.sidebar.title")}
                         description={t("glossary.sidebar.desc")}
                         id="show-glossary"
                    >
                         <Switch
                              id="show-glossary"
                              checked={settings.showGlossary}
                              onCheckedChange={checked=>setSettings({showGlossary: checked})}     
                         />
                    </SettingsOption>
               </SettingsItem>
          </div>
     )
}