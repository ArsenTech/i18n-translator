import { SettingsItemLoader, SettingsOptionLoader } from "../settings-components";

export default function GlossarySettingsLoader(){
     return (
          <div className="space-y-2">
               <SettingsItemLoader>
                    <SettingsOptionLoader optionType="selector" width={128}/>
               </SettingsItemLoader>
          </div>
     )
}