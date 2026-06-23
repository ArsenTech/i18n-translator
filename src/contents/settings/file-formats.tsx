import SettingsItem from "@/components/settings-item";
import SettingsOption from "@/components/settings-item/settings-option";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettings } from "@/context/settings";
import { NEW_TRANSLATION_FORMATS } from "@/lib/constants/items";
import { TranslationFormat } from "@/lib/types/enums";
import { Files } from "lucide-react";
import { lazy, Suspense } from "react";
import { SiAndroidstudio } from "react-icons/si";

const SelectorField = lazy(()=>import("@/components/fields/selector"))

export default function FileFormatSettings(){
     const {settings, setSettings} = useSettings()
     return (
          <div className="space-y-2">
               <SettingsItem
                    title="File Format Settings"
                    Icon={Files}
               >
                    <SettingsOption
                         title="Default format for new Translation"
                         description="Default initial translation format"
                         id="translation-format"
                    >
                         <Suspense fallback={<Skeleton className="h-8 w-full max-w-32"/>}>
                              <SelectorField
                                   name="translation-format"
                                   items={NEW_TRANSLATION_FORMATS}
                                   value={settings.defaultFormat}
                                   onChange={val=>setSettings({defaultFormat: val as TranslationFormat})}
                              />
                         </Suspense>
                    </SettingsOption>
               </SettingsItem>
               <SettingsItem
                    title="Android XML"
                    Icon={SiAndroidstudio}
               >
                    TODO: Default translatable state, Show translatable column
               </SettingsItem>
               <SettingsItem
                    title="XLIFF"
                    Icon={Files}
               >
                    TODO: Auto-detect languages, Preserve metadata
               </SettingsItem>
          </div>
     )
}