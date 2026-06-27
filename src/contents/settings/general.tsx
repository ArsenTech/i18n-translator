import SettingsItem from "@/components/settings-item";
import SettingsOption from "@/components/settings-item/settings-option";
import { Skeleton } from "@/components/ui/skeleton";
import { Cog, Palette } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { lazy, Suspense } from "react";
import { useSettings } from "@/context/settings";
import { BrightnessSliderLoader } from "@/loaders/fields";
import { useTranslation } from "react-i18next";

const ThemeToggler = lazy(()=>import("@/components/themes"));
const LanguageSwitcher = lazy(()=>import("@/i18n/lang-selector"));
const BrightnessSlider = lazy(()=>import("@/components/fields/brightness-slider"));

export default function GeneralSettings(){
     const {t} = useTranslation("settings")
     const {settings, setSettings} = useSettings()
     return (
          <div className="space-y-2">
               <SettingsItem
                    Icon={Palette}
                    title={t("appearance.title")}
               >
                    <SettingsOption
                         title={t("appearance.theme.title")}
                         description={t("appearance.theme.desc")}
                    >
                         <Suspense fallback={<Skeleton className="h-8 w-32"/>}>
                              <ThemeToggler/>
                         </Suspense>
                    </SettingsOption>
                    <SettingsOption
                         title={t("appearance.brightness.title")}
                         description={t("appearance.brightness.desc")}
                    >
                         <Suspense fallback={<BrightnessSliderLoader/>}>
                              <BrightnessSlider/>
                         </Suspense>
                    </SettingsOption>
                    <SettingsOption
                         title={t("appearance.compact-toolbar.title")}
                         description={t("appearance.compact-toolbar.desc")}
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
                    title={t("general.title")}
               >
                    <SettingsOption
                         title={t("general.lang.title")}
                         description={t("general.lang.desc")}
                    >
                         <Suspense fallback={<Skeleton className="h-8 w-28"/>}>
                              <LanguageSwitcher/>
                         </Suspense>
                    </SettingsOption>
                    <SettingsOption
                         title={t("general.auto-check-update.title")}
                         description={t("general.auto-check-update.desc")}
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