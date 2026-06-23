import { SettingsItemLoader, SettingsOptionLoader } from "../settings-components";

export default function ClearDataSettingsLoader(){
     return (
          <div className="space-y-2">
               <SettingsItemLoader includeDescription>
                    <SettingsOptionLoader optionType="selector" width={164}/>
                    <SettingsOptionLoader optionType="selector" width={138}/>
                    <SettingsOptionLoader optionType="selector" width={154}/>
               </SettingsItemLoader>
          </div>
     )
}