import SettingsItem from "@/components/settings-item";
import SettingsOption from "@/components/settings-item/settings-option";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettings } from "@/context/settings";
import { NEW_TRANSLATION_FORMATS } from "@/lib/constants/items";
import { TranslationFormat } from "@/lib/types/enums";
import { Files } from "lucide-react";
import { lazy, Suspense } from "react";

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
               {/* TODO: Android XML options, XLIFF options */}
          </div>
     )
}