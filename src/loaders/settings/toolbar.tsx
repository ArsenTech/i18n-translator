import { SettingsItemLoader, SettingsOptionLoader } from "../settings-components";

export default function ToolbarSettings(){
     return (
          <div className="space-y-2">
               <SettingsItemLoader>
                    {Array.from({length: 10}).map((_,i)=>(
                         <SettingsOptionLoader optionType="switch" key={i+1} noDescription/>
                    ))}
               </SettingsItemLoader>
          </div>
     )
}