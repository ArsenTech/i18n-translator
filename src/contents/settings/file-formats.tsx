import SettingsItem from "@/components/settings-item";
import SettingsOption from "@/components/settings-item/settings-option";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettings } from "@/context/settings";
import { NEW_TRANSLATION_FORMATS } from "@/lib/constants/items";
import { TranslationFormat } from "@/lib/types/enums";
import { Files } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { lazy, Suspense } from "react";
import { SiAndroid } from "react-icons/si"; // TODO: Implement Android XML Settings
import { useTranslation } from "react-i18next";

const SelectorField = lazy(()=>import("@/components/fields/selector"))

export default function FileFormatSettings(){
     const {t} = useTranslation("settings")
     const {settings, setSettings} = useSettings()
     return (
          <div className="space-y-2">
               <SettingsItem
                    title={t("file-format.title")}
                    Icon={Files}
               >
                    <SettingsOption
                         title={t("file-format.default-format.title")}
                         description={t("file-format.default-format.desc")}
                         id="translation-format"
                    >
                         <Suspense fallback={<Skeleton className="h-8 w-full max-w-32"/>}>
                              <SelectorField
                                   name="translation-format"
                                   items={NEW_TRANSLATION_FORMATS.map(val=>({
                                        label: t(`file-format.formats.${val}`),
                                        value: val
                                   }))}
                                   value={settings.defaultFormat}
                                   onChange={val=>setSettings({defaultFormat: val as TranslationFormat})}
                              />
                         </Suspense>
                    </SettingsOption>
               </SettingsItem>
               <SettingsItem
                    title={t("android-xml.title")}
                    Icon={SiAndroid}
               >
                    <SettingsOption
                         title={t("android-xml.translatable-state.title")}
                         description={t("android-xml.translatable-state.desc")}
                         id="default-translatable"
                    >
                         <Switch
                              disabled
                              id="default-translatable"
                              checked={settings.androidTranslatable}
                              onCheckedChange={checked=>setSettings({ androidTranslatable: checked })}
                         />
                    </SettingsOption>
                    <SettingsOption
                         title={t("android-xml.show-translatable.title")}
                         description={t("android-xml.show-translatable.desc")}
                         id="show-translatable"
                    >
                         <Switch
                              disabled
                              id="show-translatable"
                              checked={settings.androidTranslatableCol}
                              onCheckedChange={checked=>setSettings({ androidTranslatableCol: checked })}
                         />
                    </SettingsOption>
               </SettingsItem>
               <SettingsItem
                    title={t("xliff.title")}
                    Icon={Files}
               >
                    <SettingsOption
                         title={t("xliff.auto-detect.title")}
                         description={t("xliff.auto-detect.desc")}
                         id="auto-detect-lang"
                    >
                         <Switch
                              id="auto-detect-lang"
                              checked={settings.xliffAutoDetect}
                              onCheckedChange={checked=>setSettings({xliffAutoDetect: checked})}
                         />
                    </SettingsOption>
                    <SettingsOption
                         title={t("xliff.preserve-meta.title")}
                         description={t("xliff.preserve-meta.desc")}
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