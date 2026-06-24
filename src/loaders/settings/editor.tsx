import { SettingsItemLoader, SettingsOptionLoader } from "../settings-components";

export default function EditorSettingsLoader(){
     return (
          <div className="space-y-2">
               <SettingsItemLoader>
                    <SettingsOptionLoader optionType="switch"/>
                    <SettingsOptionLoader optionType="switch"/>
                    <SettingsOptionLoader optionType="switch"/>
                    <SettingsOptionLoader optionType="switch"/>
                    <SettingsOptionLoader optionType="switch"/>
               </SettingsItemLoader>
               <SettingsItemLoader>
                    <SettingsOptionLoader optionType="selector" width={250}/>
                    <SettingsOptionLoader optionType="selector" width={250}/>
               </SettingsItemLoader>
          </div>
     )
}