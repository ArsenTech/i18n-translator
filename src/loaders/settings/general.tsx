import { SettingsItemLoader, SettingsOptionLoader } from "../settings-components";

export default function GeneralSettingsLoader(){
     return (
          <div className="space-y-2">
               <SettingsItemLoader>
                    <SettingsOptionLoader optionType="selector" width={128}/>
                    <SettingsOptionLoader optionType="brightness"/>
                    <SettingsOptionLoader optionType="switch"/>
               </SettingsItemLoader>
               <SettingsItemLoader>
                    <SettingsOptionLoader optionType="selector" width={112}/>
                    <SettingsOptionLoader optionType="switch"/>
               </SettingsItemLoader>
          </div>
     )
}