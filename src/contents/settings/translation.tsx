import SettingsItem from "@/components/settings-item";
import SettingsOption from "@/components/settings-item/settings-option";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/context/settings";
import { SiGooglegemini, SiLibretranslate, SiOllama } from "react-icons/si";

export default function TranslationSettings(){
     const {providers, setProviders} = useSettings()
     return (
          <div className="space-y-2">
               <SettingsItem
                    title="Google Gemini Settings"
                    Icon={SiGooglegemini}
               >
                    <SettingsOption
                         title="Google Gemini API Key"
                         description="The key that makes Google Gemini work"
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
                    title="Libre Translate Settings"
                    Icon={SiLibretranslate}
               >
                    <SettingsOption
                         title="Libre Translate Server URL"
                         description="URL of the translation server"
                         id="libre-translate-server"
                    >
                         <Input
                              id="libre-translate-server"
                              className="w-1/3"
                              value={providers.libreTranslateServer}
                              onChange={e=>setProviders({libreTranslateServer: e.target.value.trim()})}
                         />
                    </SettingsOption>
                    <SettingsOption
                         title="Libre Translate API Key"
                         description="The key that makes Libre Translate work"
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
                    title="Llama AI Settings"
                    Icon={SiOllama}
               >
                    <SettingsOption
                         title="Llama AI endpoint"
                         description="The AI endpoint to make it work"
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
                         title="Llama AI model"
                         description="The AI model to auto-translate"
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