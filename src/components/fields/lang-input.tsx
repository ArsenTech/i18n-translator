import { CircleFlagLanguage } from "react-circle-flags";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Languages } from "lucide-react";

type LanguageInputProps = Omit<React.ComponentProps<"input">,"value"|"onChange"> & {
     onLangChange: (langCode: string) => void,
     lang: string
}
export default function LanguageInput({onLangChange, lang, placeholder, ...props}: LanguageInputProps){
     return (
          <InputGroup>
               <InputGroupInput
                    {...props}
                    value={lang}
                    onChange={e=>onLangChange(e.target.value)}
                    placeholder={placeholder ?? "en"}
               />
               <InputGroupAddon>
                    {lang ? <CircleFlagLanguage languageCode={lang ?? "xx"} width={16} height={16}/> : <Languages/>}
               </InputGroupAddon>
          </InputGroup>
     )
}