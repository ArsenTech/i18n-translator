import { useAppTranslation } from "@/context/translation";
import LangSelector from "../lang-selector";

export default function LanguageSelect(){
     const {langs, updateLangs} = useAppTranslation()
     return (
          <div className="flex items-center gap-2">
               <span>From</span>
               <LangSelector
                    placeholder="Base Language"
                    className="flex-1"
                    value={langs.base}
                    onChange={lang=>updateLangs({base: lang})}
               />
               <span>to</span>
               <LangSelector
                    className="flex-1"
                    value={langs.target}
                    onChange={lang=>updateLangs({target: lang})}
               />
          </div>
     )
}