import SettingsOption from "@/components/settings-item/settings-option";
import RadioField from "@/components/fields/radio-field";
import { useSettings } from "@/context/settings";
import { GlossaryTogglerType } from "@/lib/types";
import SettingsItem from "@/components/settings-item";
import { BookOpen } from "lucide-react";
import { useGlossary } from "@/context/glossary";

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
                         id="glossary-view"
                    >
                         <RadioField
                              className="flex items-center gap-3 flex-1"
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
                    </SettingsOption>
               </SettingsItem>
               {/* TODO: Auto-load glossary */}
          </div>
     )
}