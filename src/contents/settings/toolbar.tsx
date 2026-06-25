import SettingsItem from "@/components/settings-item";
import SettingsOption from "@/components/settings-item/settings-option";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/context/settings";
import { TOOLBAR_OPTIONS } from "@/lib/constants/toolbars";
import { Wrench } from "lucide-react";

export default function ToolbarSettings(){
     const {toolbars, setToolbars} = useSettings()
     return (
          <div className="space-y-2">
               <SettingsItem
                    title="Toolbar Buttons"
                    description="Show / hide few actions from the toolbar"
                    Icon={Wrench}
               >
                    {TOOLBAR_OPTIONS.map(({ key, title, Icon }) => (
                         <SettingsOption key={key} title={title} Icon={Icon} id={`toolbar-${key}`}>
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