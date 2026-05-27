import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { cn, getErrorMessage } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { CircleFlag, CircleFlagLanguage } from 'react-circle-flags'
import TranslatorActions from "@/lib/actions/translator";

interface LangSelectorProps{
     onLangChange?: (langCode: string) => void,
     lang?: string,
     placeholder?: string,
     className?: string
}
export default function LangSelector({
     lang,
     onLangChange,
     placeholder="Language to Translate",
     className
}: LangSelectorProps){
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
                    const resData = await TranslatorActions.fetchLanguages();
                    if(!resData) {
                         toast.error("Failed to load the language list");
                         return;
                    }
                    setData(resData)
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
          <Skeleton className={cn("h-8",className)}/>
     ) : (
          <Select value={lang} onValueChange={onLangChange}>
               <SelectTrigger className={className}>
                    <SelectValue placeholder={placeholder}/>
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