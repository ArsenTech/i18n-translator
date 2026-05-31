import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { cn, getErrorMessage } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { CircleFlag, CircleFlagLanguage } from 'react-circle-flags'
import TranslatorActions from "@/actions/translator";
import { Noop } from "react-hook-form";

interface LangSelectorProps{
     className?: string,
     onChange?: (...event: any[]) => void;
     onBlur?: Noop;
     value?: string;
     disabled?: boolean;
     name?: string;
     invalid?: boolean,
     placeholder?: string,
}
export default function LangSelector({name, value, onChange, invalid, disabled, onBlur, placeholder="Language to Translate", className}: LangSelectorProps){
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
          <Select value={value} onValueChange={onChange} disabled={disabled}>
               <SelectTrigger id={name} name={name} aria-invalid={invalid} className={className} onBlur={onBlur}>
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