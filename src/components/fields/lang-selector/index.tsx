import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { cn, getErrorMessage } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Noop } from "react-hook-form";
import FetcherActions from "@/actions/fetcher";
import { Button } from "@/components/ui/button";
import type { ILangItem } from "@/lib/types/data";
import { Command, CommandInput, CommandEmpty, CommandList, CommandGroup } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const LangSelectorItem = lazy(()=>import("./item"));
const LangIcon = lazy(()=>import("../../lang-icon"));

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
                         toast.error("Failed to load the language list",{
                              id: "load-error"
                         });
                         return;
                    }
                    setData(resData)
               } catch (err) {
                    toast.error("Failed to load the language list",{
                         description: getErrorMessage(err),
                         id: "load-error"
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
                         <Suspense fallback={<Skeleton className="size-4.5"/>}>
                              <LangIcon lang={selected}/>
                         </Suspense>
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
                                   <Suspense fallback={null}>
                                        {filtered.slice(0,100).map(lang => (
                                             <LangSelectorItem
                                                  key={lang.code}
                                                  lang={lang}
                                                  onSelect={() => {
                                                       onChange?.(lang.code)
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