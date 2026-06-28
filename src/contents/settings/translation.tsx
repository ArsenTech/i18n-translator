import SettingsItem from "@/components/settings-item";
import SettingsOption from "@/components/settings-item/settings-option";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/context/settings";
import { useTranslation } from "react-i18next";
import { SiGooglegemini, SiLibretranslate, SiOllama } from "react-icons/si";

export default function TranslationSettings(){
     const {t: geminiTxt} = useTranslation("settings",{
          keyPrefix: "gemini-settings"
     })
     const {t: libreTranslateTxt} = useTranslation("settings",{
          keyPrefix: "libre-translate-settings"
     })
     const {t: llamaTxt} = useTranslation("settings",{
          keyPrefix: "llama-settings"
     })
     const {providers, setProviders} = useSettings()
     return (
          <div className="space-y-2">
               <SettingsItem
                    title={geminiTxt("title")}
                    Icon={SiGooglegemini}
               >
                    <SettingsOption
                         title={geminiTxt("api-key.title")}
                         description={geminiTxt("api-key.desc")}
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
                    title={libreTranslateTxt("title")}
                    Icon={SiLibretranslate}
               >
                    <SettingsOption
                         title={libreTranslateTxt("server-url.title")}
                         description={libreTranslateTxt("server-url.desc")}
                    >
                         <Input
                              id="libre-translate-server"
                              className="w-1/3"
                              value={providers.libreTranslateServer}
                              onChange={e=>setProviders({libreTranslateServer: e.target.value.trim()})}
                         />
                    </SettingsOption>
                    <SettingsOption
                         title={libreTranslateTxt("api-key.title")}
                         description={libreTranslateTxt("api-key.desc")}
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
                    title={llamaTxt("title")}
                    Icon={SiOllama}
               >
                    <SettingsOption
                         title={llamaTxt("endpoint.title")}
                         description={llamaTxt("endpoint.desc")}
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
                         title={llamaTxt("model.title")}
                         description={llamaTxt("model.desc")}
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