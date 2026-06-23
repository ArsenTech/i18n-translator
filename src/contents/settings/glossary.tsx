import SettingsOption from "@/components/settings-item/settings-option";
import { useSettings } from "@/context/settings";
import { GlossaryTogglerType } from "@/lib/types";
import SettingsItem from "@/components/settings-item";
import { BookOpen } from "lucide-react";
import { useGlossary } from "@/context/glossary";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";

const SelectorField = lazy(()=>import("@/components/fields/selector"))

export default function GlossarySettings(){
     const {settings, setSettings} = useSettings()
     const {setShowType} = useGlossary()
     return (
          <div className="space-y-2">
               <SettingsItem
                    title="Glossary Settings"
                    Icon={BookOpen}
               >
                    <SettingsOption
                         title="Default glossary view"
                         description="Default glossary view type (Show All / Few)"
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
                                        {value: "few", label: "Show few"},
                                        {value: "all", label: "Show all"}
                                   ]}
                              />
                         </Suspense>
                    </SettingsOption>
                    <SettingsOption
                         title="Show sidebar by default"
                         description="Show the glossary sidebar everytime you enter the app"
                         id="show-glossary"
                    >
                         <Switch
                              id="show-glossary"
                              checked={settings.showGlossary}
                              onCheckedChange={checked=>setSettings({showGlossary: checked})}     
                         />
                    </SettingsOption>
               </SettingsItem>
               {/* TODO: Auto-load glossary */}
          </div>
     )
}