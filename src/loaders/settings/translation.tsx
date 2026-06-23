import { SettingsItemLoader, SettingsOptionLoader } from "../settings-components";

export default function TranslationSettings(){
     return (
          <div className="space-y-2">
               <SettingsItemLoader>
                    <SettingsOptionLoader optionType="input"/>
               </SettingsItemLoader>
               <SettingsItemLoader>
                    <SettingsOptionLoader optionType="input"/>
                    <SettingsOptionLoader optionType="input"/>
               </SettingsItemLoader>
               <SettingsItemLoader>
                    <SettingsOptionLoader optionType="input"/>
                    <SettingsOptionLoader optionType="input"/>
               </SettingsItemLoader>
          </div>
     )
}