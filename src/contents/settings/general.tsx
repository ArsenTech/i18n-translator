import SettingsItem from "@/components/settings-item";
import SettingsOption from "@/components/settings-item/settings-option";
import { Skeleton } from "@/components/ui/skeleton";
import { Cog, Palette } from "lucide-react";
import { lazy, Suspense } from "react";

const ThemeToggler = lazy(()=>import("@/components/themes"));
const LanguageSwitcher = lazy(()=>import("@/i18n/lang-selector"));

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
                         <Suspense fallback={<Skeleton className="h-8 w-32"/>}>
                              <ThemeToggler/>
                         </Suspense>
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
               </SettingsItem>
               {/* TODO: Check updates on startup */}
          </div>
     )
}