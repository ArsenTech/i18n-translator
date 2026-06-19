import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { cn, getErrorMessage } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleFlag, CircleFlagLanguage } from 'react-circle-flags'
import { Noop } from "react-hook-form";
import FetcherActions from "@/actions/fetcher";
import { Button } from "@/components/ui/button";
import { ILangItem } from "@/lib/types/data";
import { Languages } from "lucide-react";
import { Command, CommandInput, CommandEmpty, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface LangSelectorProps{
     className?: string
     onChange?: (value: string) => void
     onBlur?: Noop
     value?: string
     disabled?: boolean
     name?: string
     invalid?: boolean
     placeholder?: string
}
export default function LangSelector({name, value, onChange, invalid, disabled, onBlur, placeholder="Language to Translate", className}: LangSelectorProps){
     const [isLoading, setIsLoading] = useState(true);
     const [open, setOpen] = useState(false)
     const [search, setSearch] = useState("")
     const [data, setData] = useState<ILangItem[]>([])
     const selected = data.find(item => item.code === value)
     const filtered = useMemo(() => data.filter(item =>
          `${item.name} (${item.code})`.toLowerCase().includes(search.toLowerCase())
     ),[data, search])
     useEffect(()=>{
          (async()=>{
               try{
                    const resData = await FetcherActions.fetchLanguages();
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
          <Popover open={open} onOpenChange={setOpen}>
               <PopoverTrigger asChild>
                    <Button
                         name={name}
                         aria-invalid={invalid}
                         disabled={disabled}
                         onBlur={onBlur}
                         variant="outline"
                         type="button"
                         className={cn("justify-start font-normal", className)}
                    >
                         {selected ? (
                              selected.type==="country" ? (
                                   <CircleFlag countryCode={selected.flag} width={18} height={18}/>
                              ) : selected.type==="language" ? (
                                   <CircleFlagLanguage languageCode={selected.flag} width={18} height={16}/>
                              ) : (
                                   <CircleFlagLanguage languageCode="xx" width={18} height={18}/>
                              )
                         ) : (
                              <Languages className="text-muted-foreground size-4"/>
                         )}
                         {selected?.name || placeholder}
                    </Button>
               </PopoverTrigger>
               <PopoverContent className="w-(--radix-popover-trigger-width) p-0 overflow-hidden">
                    <Command>
                         <CommandInput
                              value={search}
                              onValueChange={setSearch}
                              placeholder={placeholder}
                         />
                         <CommandEmpty>
                              No languages found.
                         </CommandEmpty>
                         <CommandList className="max-h-64 overflow-y-auto overscroll-contain" onWheel={(e) => e.stopPropagation()}>
                              <CommandGroup>
                                   {filtered.slice(0,200).map(lang => (
                                        <CommandItem
                                             key={lang.code}
                                             value={`${lang.name} (${lang.code})`}
                                             onSelect={() => {
                                                  onChange?.(lang.code)
                                                  setOpen(false)
                                             }}
                                        >
                                             {lang.type==="country" ? (
                                                  <CircleFlag countryCode={lang.flag} width={18} height={18}/>
                                             ) : lang.type==="language" ? (
                                                  <CircleFlagLanguage languageCode={lang.flag} width={18} height={16}/>
                                             ) : (
                                                  <CircleFlagLanguage languageCode="xx" width={18} height={18}/>
                                             )}
                                             {lang.name} ({lang.code})
                                        </CommandItem>
                                   ))}
                              </CommandGroup>
                         </CommandList>
                    </Command>
               </PopoverContent>
          </Popover>
     )
}