import SettingsItem from "@/components/settings-item";
import SettingsOption from "@/components/settings-item/settings-option";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettings } from "@/context/settings";
import { NEW_TRANSLATION_FORMATS } from "@/lib/constants/items";
import { TranslationFormat } from "@/lib/types/enums";
import { Files } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { lazy, Suspense } from "react";
// import { SiAndroid } from "react-icons/si";

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
               {/* <SettingsItem
                    title="Android XML"
                    Icon={SiAndroid}
               >
                    <SettingsOption
                         title="Default Translatable State"
                         description="Initial value of the Android translatable state"
                         id="default-translatable"
                    >
                         <Switch
                              id="default-translatable"
                              checked={settings.androidTranslatable}
                              onCheckedChange={checked=>setSettings({ androidTranslatable: checked })}
                         />
                    </SettingsOption>
                    <SettingsOption
                         title="Show Translatable column"
                         description="Show translatable table column every time you enter the app"
                         id="show-translatable"
                    >
                         <Switch
                              id="show-translatable"
                              checked={settings.androidTranslatableCol}
                              onCheckedChange={checked=>setSettings({ androidTranslatableCol: checked })}
                         />
                    </SettingsOption>
               </SettingsItem> */}
               <SettingsItem
                    title="XLIFF"
                    Icon={Files}
               >
                    <SettingsOption
                         title="Auto-detect language"
                         description="Auto-detect language everytime the XLIFF file is opened"
                         id="auto-detect-lang"
                    >
                         <Switch
                              id="auto-detect-lang"
                              checked={settings.xliffAutoDetect}
                              onCheckedChange={checked=>setSettings({xliffAutoDetect: checked})}
                         />
                    </SettingsOption>
                    <SettingsOption
                         title="Preserve Metadata"
                         description="Keep existing translation metadata when opening or saving XLIFF files"
                         id="preserve-meta"
                    >
                         <Switch
                              id="preserve-meta"
                              checked={settings.xliffPreserveMeta}
                              onCheckedChange={checked => setSettings({ xliffPreserveMeta: checked })}
                         />
                    </SettingsOption>
               </SettingsItem>
          </div>
     )
}