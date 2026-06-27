import SettingsItem from "@/components/settings-item";
import SettingsOption from "@/components/settings-item/settings-option";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/context/settings";
import { useTranslation } from "react-i18next";
import { SiGooglegemini, SiLibretranslate, SiOllama } from "react-icons/si";

export default function TranslationSettings(){
     const {t} = useTranslation("settings")
     const {providers, setProviders} = useSettings()
     return (
          <div className="space-y-2">
               <SettingsItem
                    title={t("gemini-settings.title")}
                    Icon={SiGooglegemini}
               >
                    <SettingsOption
                         title={t("gemini-settings.api-key.title")}
                         description={t("gemini-settings.api-key.desc")}
                         id="gemini-key"
                    >
                         <Input
                              id="gemini-key"
                              className="w-1/3"
                              value={providers.geminiApi}
                              onChange={e=>setProviders({geminiApi: e.target.value.trim()})}
                         />
                    </SettingsOption>
               </SettingsItem>
               <SettingsItem
                    title={t("libre-translate-settings.title")}
                    Icon={SiLibretranslate}
               >
                    <SettingsOption
                         title={t("libre-translate-settings.server-url.title")}
                         description={t("libre-translate-settings.server-url.desc")}
                    >
                         <Input
                              id="libre-translate-server"
                              className="w-1/3"
                              value={providers.libreTranslateServer}
                              onChange={e=>setProviders({libreTranslateServer: e.target.value.trim()})}
                         />
                    </SettingsOption>
                    <SettingsOption
                         title={t("libre-translate-settings.api-key.title")}
                         description={t("libre-translate-settings.api-key.desc")}
                         id="libre-translate-key"
                    >
                         <Input
                              id="libre-translate-key"
                              className="w-1/3"
                              value={providers.libreTranslateApi}
                              onChange={e=>setProviders({libreTranslateApi: e.target.value.trim()})}
                         />
                    </SettingsOption>
               </SettingsItem>
               <SettingsItem
                    title={t("llama-settings.title")}
                    Icon={SiOllama}
               >
                    <SettingsOption
                         title={t("llama-settings.endpoint.title")}
                         description={t("llama-settings.endpoint.desc")}
                         id="llama-endpoint"
                    >
                         <Input
                              id="llama-endpoint"
                              className="w-1/3"
                              value={providers.llamaEndpoint}
                              onChange={e=>setProviders({llamaEndpoint: e.target.value.trim()})}
                         />
                    </SettingsOption>
                    <SettingsOption
                         title={t("llama-settings.model.title")}
                         description={t("llama-settings.model.desc")}
                         id="llama-model"
                    >
                         <Input
                              id="llama-model"
                              className="w-1/3"
                              value={providers.llamaModel}
                              onChange={e=>setProviders({llamaModel: e.target.value})}
                         />
                    </SettingsOption>
               </SettingsItem>
          </div>
     )
}