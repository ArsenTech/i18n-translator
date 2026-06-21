import SettingsItem from "@/components/settings-item";
import SettingsOption from "@/components/settings-item/settings-option";
import ThemeToggler from "@/components/themes";
import LanguageSwitcher from "@/i18n/languages";
import { Cog, Palette } from "lucide-react";

export default function GeneralSettings(){
     return (
          <div className="space-y-2">
               <SettingsItem
                    Icon={Palette}
                    title="Appearence"
               >
                    <SettingsOption
                         title="Theme"
                         description="Theme and color of the app"
                    >
                         <ThemeToggler/>
                    </SettingsOption>
               </SettingsItem>
               <SettingsItem
                    Icon={Cog}
                    title="General Settings"
               >
                    <SettingsOption
                         title="Language"
                         description="Language of I18N Translator"
                    >
                         <LanguageSwitcher/>
                    </SettingsOption>
               </SettingsItem>
               {/* TODO: Check updates on startup */}
          </div>
     )
}