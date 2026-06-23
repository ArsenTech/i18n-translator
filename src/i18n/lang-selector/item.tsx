import { CountryFlag } from "@/components/lang-icon"
import { CommandItem } from "@/components/ui/command"
import { LanguageOption } from "../types"

interface LanguageSelectorItemProps{
     lang: LanguageOption
     onSelect: () => void
}
export default function LanguageSelectorItem({lang, onSelect}: LanguageSelectorItemProps){
     return (
          <CommandItem
               value={`${lang.language} (${lang.code})`}
               onSelect={onSelect}
               className="w-full"
          >
               <CountryFlag countryCode={lang.countryCode} width={16} height={16}/>
               {lang.language}
          </CommandItem>
     )
}