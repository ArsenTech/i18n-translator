import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { CircleFlag, CircleFlagLanguage } from 'react-circle-flags'

interface LangSelectorProps{
     onLangChange: (langCode: string) => void,
     lang: string
}
export default function LangSelector({lang, onLangChange}: LangSelectorProps){
     const [isLoading, setIsLoading] = useState(true);
     const [data, setData] = useState<{
          flag: string,
          name: string,
          code: string,
          type: "country" | "language"
     }[]>([])
     useEffect(()=>{
          (async()=>{
               try{
                    const res = await fetch("/lang-list.json");
                    const resData: {
                         flag: string,
                         name: string,
                         code: string,
                         type: "country" | "language"
                    }[] = await res.json();
                    setData(resData.sort(({name: a},{name: b})=>a>b ? 1 : a<b ? -1 : 0))
               } catch (err) {
                    toast.error("Failed to load the language list",{
                         description: getErrorMessage(err)
                    })
               } finally {
                    setIsLoading(false)
               }
          })()
     },[])
     return isLoading ? (
          <Skeleton className="w-48 h-8"/>
     ) : (
          <Select value={lang} onValueChange={onLangChange}>
               <SelectTrigger>
                    <SelectValue placeholder="Language to Translate"/>
               </SelectTrigger>
               <SelectContent>
                    {data.map(lang => (
                         <SelectItem key={lang.code} value={lang.code}>
                              {lang.type==="country" ? (
                                   <CircleFlag countryCode={lang.flag} width={18} height={18}/>
                              ) : lang.type==="language" ? (
                                   <CircleFlagLanguage languageCode={lang.flag} width={18} height={16}/>
                              ) : (
                                   <CircleFlagLanguage languageCode="xx" width={18} height={18}/>
                              )}
                              {lang.name}
                         </SelectItem>
                    ))}
               </SelectContent>
          </Select>
     )
}