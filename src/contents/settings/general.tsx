import SettingsItem from "@/components/settings-item";
import SettingsOption from "@/components/settings-item/settings-option";
import { Skeleton } from "@/components/ui/skeleton";
import { Cog, Palette } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { lazy, Suspense } from "react";
import { useSettings } from "@/context/settings";
import { BrightnessSliderLoader } from "@/loaders/fields";

const ThemeToggler = lazy(()=>import("@/components/themes"));
const LanguageSwitcher = lazy(()=>import("@/i18n/lang-selector"));
const BrightnessSlider = lazy(()=>import("@/components/fields/brightness-slider"));

export default function GeneralSettings(){
     const {settings, setSettings} = useSettings()
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
                         <Suspense fallback={<Skeleton className="h-8 w-32"/>}>
                              <ThemeToggler/>
                         </Suspense>
                    </SettingsOption>
                    <SettingsOption
                         title="Brightness"
                         description="Adjust the app's brightness from 0 to 100"
                    >
                         <Suspense fallback={<BrightnessSliderLoader/>}>
                              <BrightnessSlider/>
                         </Suspense>
                    </SettingsOption>
                    <SettingsOption
                         title="Compact Toolbar"
                         description="Show smaller buttons instead in the toolbar"
                         id="compact-toolbar"
                    >
                         <Switch
                              id="compact-toolbar"
                              checked={settings.compactToolbar}
                              onCheckedChange={checked=>setSettings({compactToolbar: checked})}
                         />
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
                         <Suspense fallback={<Skeleton className="h-8 w-28"/>}>
                              <LanguageSwitcher/>
                         </Suspense>
                    </SettingsOption>
                    <SettingsOption
                         title="Check updates on startup"
                         description="Auto-checks for new version availability"
                         id="auto-check"
                    >
                         <Switch
                              id="auto-check"
                              checked={settings.checkUpdatesOnStartup}
                              onCheckedChange={checked=>setSettings({checkUpdatesOnStartup: checked})}
                         />
                    </SettingsOption>
               </SettingsItem>
          </div>
     )
}