import { SettingsItemLoader, SettingsOptionLoader } from "../settings-components";

export default function FileFormatSettings(){
     return (
          <div className="space-y-2">
               <SettingsItemLoader>
                    <SettingsOptionLoader optionType="selector" width={128}/>
               </SettingsItemLoader>
               {/* <SettingsItemLoader>
                    <SettingsOptionLoader optionType="switch"/>
                    <SettingsOptionLoader optionType="switch"/>
               </SettingsItemLoader> */}
               <SettingsItemLoader>
                    <SettingsOptionLoader optionType="switch"/>
                    <SettingsOptionLoader optionType="switch"/>
               </SettingsItemLoader>
          </div>
     )
}