import type { ILangItem } from "@/lib/types/data";
import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { CircleFlag, CircleFlagLanguage, CircleFlagLanguageProps, CircleFlagProps } from "react-circle-flags";

export function LanguageFlag(props: CircleFlagLanguageProps) {
     const [isBrokenImg, setIsBrokenImg] = useState(false);
     useEffect(() => {
          setIsBrokenImg(false);
     }, [props.languageCode]);
     if (isBrokenImg) {
          return <Languages className="text-muted-foreground size-4" />;
     }
     return (
          <CircleFlagLanguage
               {...props}
               onError={(e) => {
                    props.onError?.(e);
                    setIsBrokenImg(true);
               }}
          />
     );
}
export function CountryFlag(props: CircleFlagProps) {
     const [isBrokenImg, setIsBrokenImg] = useState(false);
     useEffect(() => {
          setIsBrokenImg(false);
     }, [props.countryCode]);
     if (isBrokenImg) {
          return <Languages className="text-muted-foreground size-4" />;
     }
     return (
          <CircleFlag
               {...props}
               onError={(e) => {
                    props.onError?.(e);
                    setIsBrokenImg(true);
               }}
          />
     );
}

interface LangIconProps{
     lang?: ILangItem
}
export default function LangIcon({lang}: LangIconProps){
     if(!lang) return (
          <Languages className="text-muted-foreground size-4"/>
     )
     if(lang.type==="country") return (
          <CountryFlag countryCode={lang.flag} width={18} height={18}/>
     )
     if(lang.type==="language") return (
          <LanguageFlag languageCode={lang.flag} width={18} height={16}/>
     )
     return (
          <LanguageFlag languageCode="xx" width={18} height={18}/>
     )
}