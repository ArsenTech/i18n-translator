import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { invoke } from "@tauri-apps/api/core";
import { LangCode } from "../types";
import { CountryFlag } from "@/components/lang-icon";
import { Button } from "@/components/ui/button";
import { Popover,PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandEmpty, CommandList, CommandGroup } from "@/components/ui/command";
import { languages } from "../config";
import { ChevronDown, Languages } from "lucide-react";
import { cn } from "@/lib/utils";

const LanguageSelectorItem = lazy(()=>import("./item"));

export default function LanguageSelector(){
     const [open, setOpen] = useState(false)
     const [lang, setLang] = useState<LangCode>(i18next.language as LangCode);
     const {i18n} = useTranslation();
     const selected = languages.find(item => item.code === lang)
     const [search, setSearch] = useState("")
     const handleChangeLang = async(lang: LangCode) => {
          setLang(lang);
          i18next.changeLanguage(lang)
          await invoke("set_language",{ lang });
          await invoke("rebuild_tray")
     }
     useEffect(()=>{
          document.body.dir = i18n.dir()
     },[i18n, i18n.language])
     const filtered = useMemo(() => languages.filter(item =>
          `${item.language} (${item.code})`.toLowerCase().includes(search.toLowerCase())
     ),[languages, search])
     return (
          <Popover open={open} onOpenChange={setOpen}>
               <PopoverTrigger asChild>
                    <Button
                         variant="outline"
                         type="button"
                         className="justify-start font-normal"
                    >
                         {selected ? <CountryFlag countryCode={selected?.countryCode ?? "xx"} width={16} height={16}/> : <Languages className="text-muted-foreground size-4" />}
                         {selected?.language}
                         <ChevronDown className={cn("text-muted-foreground transition-transform", open && "rotate-180")} />
                    </Button>
               </PopoverTrigger>
               <PopoverContent className="w-full max-w-48 p-0 overflow-hidden">
                    <Command className="w-full">
                         <CommandInput
                              value={search}
                              onValueChange={setSearch}
                              placeholder="Search for language"
                         />
                         <CommandEmpty>
                              No languages found.
                         </CommandEmpty>
                         <CommandList className="max-h-64 overflow-y-auto overscroll-contain" onWheel={(e) => e.stopPropagation()}>
                              <CommandGroup className="w-full">
                                   <Suspense fallback={null}>
                                        {filtered.slice(0,25).map(lang => (
                                             <LanguageSelectorItem
                                                  key={lang.code}
                                                  lang={lang}
                                                  onSelect={() => {
                                                       handleChangeLang(lang.code)
                                                       setOpen(false)
                                                  }}
                                             />
                                        ))}
                                   </Suspense>
                              </CommandGroup>
                         </CommandList>
                    </Command>
               </PopoverContent>
          </Popover>
     )
}