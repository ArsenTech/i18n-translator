"use client"
import { CircleFlag } from 'react-circle-flags'
import { useEffect, useMemo, useState, useTransition } from "react";
import { languages } from "./config";
import { LangCode } from "./types";
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import i18next, { t } from 'i18next';
import { useTranslation } from 'react-i18next';

interface LangSwitcherSelectProps{
     children: React.ReactNode,
     defaultValue: LangCode,
     label: string,
     open: boolean,
     onOpenChange: (val: boolean) => void,
     disabled: boolean
}
function LangSwitcherSelect({children,defaultValue, open, onOpenChange, disabled, label}: LangSwitcherSelectProps){
     const lang = useMemo(()=>languages.find(val=>val.code===defaultValue),[defaultValue])
     return (
          <DropdownMenu open={open} onOpenChange={onOpenChange}>
               {lang && (
                    <DropdownMenuTrigger disabled={disabled} className={cn("font-sans! select-none",disabled && "pointer-events-none opacity-50")} asChild>
                         <Button className="shadow-xs text-primary rounded-r-4xl" variant="ghost" title={label}>
                              <CircleFlag countryCode={lang.countryCode} className="size-4" title={lang.language}/>
                              <ChevronDown className={cn(open && "rotate-180","transition-all")}/>
                         </Button>
                    </DropdownMenuTrigger>
               )}
               <DropdownMenuContent className="font-sans!">
                    {children}
               </DropdownMenuContent>
          </DropdownMenu>
     )
}

export default function LanguageSwitcher(){
     const [lang, setLang] = useState<LangCode>(i18next.language as LangCode);
     const {i18n} = useTranslation();
     useEffect(()=>{
          document.body.dir = i18n.dir()
     },[i18n, i18n.language])
     const [isOpen, setIsOpen] = useState(false);
     const [isPending, startTransition] = useTransition();
     const handleChangeLang = (lang: LangCode) => {
          setIsOpen(false);
          startTransition(()=>{
               setLang(lang);
               i18next.changeLanguage(lang)
          })
     }
     return (
          <LangSwitcherSelect open={isOpen} onOpenChange={setIsOpen} disabled={isPending} defaultValue={lang} label={t("labels.lang-switcher")}>
               {languages.map(lang=>(
                    <DropdownMenuItem key={lang.code} onClick={()=>handleChangeLang(lang.code)}>
                         <CircleFlag countryCode={lang.countryCode} className="size-4"/>
                         {lang.language}
                    </DropdownMenuItem>
               ))}
          </LangSwitcherSelect>
     )
}