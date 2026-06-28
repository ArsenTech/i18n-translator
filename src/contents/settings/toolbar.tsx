import SettingsItem from "@/components/settings-item";
import SettingsOption from "@/components/settings-item/settings-option";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/context/settings";
import { TOOLBAR_OPTIONS } from "@/lib/constants/toolbars";
import { Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ToolbarSettings(){
     const {t} = useTranslation("settings",{
          keyPrefix: "toolbar-buttons"
     })
     const {toolbars, setToolbars} = useSettings()
     return (
          <div className="space-y-2">
               <SettingsItem
                    title={t("title")}
                    description={t("desc")}
                    Icon={Wrench}
               >
                    {TOOLBAR_OPTIONS.map(({ key, Icon }) => (
                         <SettingsOption key={key} title={t(key)} Icon={Icon} id={`toolbar-${key}`}>
                              <Switch
                                   id={`toolbar-${key}`}
                                   checked={toolbars[key]}
                                   onCheckedChange={(checked) => setToolbars({[key]: checked})}
                              />
                         </SettingsOption>
                    ))}
               </SettingsItem>
          </div>
     )
}