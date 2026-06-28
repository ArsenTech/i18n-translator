import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandSeparator } from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"
import { getFileActions, getEditActions, getTranslationActions, getViewActions } from "@/lib/helpers/commands"
import { Popup } from "@/lib/types/string-unions"
import { lazy, Suspense } from "react"
import { useTranslation } from "react-i18next"

const CommandsPopupItem = lazy(()=>import("@/components/command-item"))

interface CommandsContentProps{
     openPopup: (popup: Popup) => void
}
export default function CommandsContent({openPopup}: CommandsContentProps){
     const {t} = useTranslation("translation",{
          keyPrefix: "command-popup"
     })
     return (
          <Command>
               <CommandInput placeholder={t("search")} />
               <CommandList>
                    <CommandEmpty>{t("not-found")}</CommandEmpty>
                    <CommandGroup heading={t("file.title")}>
                         <Suspense fallback={(
                              <>
                              {Array.from({length: 5}).map((_,i)=><Skeleton className="h-8 w-full" key={`file-${i+1}-loader`}/>)}
                              </>
                         )}>
                              {getFileActions(t).map((data,i)=>(
                                   <CommandsPopupItem
                                        key={`file-${i+1}`}
                                        data={data}
                                        openPopup={openPopup}
                                   />
                              ))}
                         </Suspense>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading={t("edit.title")}>
                         <Suspense fallback={(
                              <>
                              {Array.from({length: 4}).map((_,i)=><Skeleton className="h-8 w-full" key={`edit-${i+1}-loader`}/>)}
                              </>
                         )}>
                              {getEditActions(t).map((data,i)=>(
                                   <CommandsPopupItem
                                        key={`edit-${i+1}`}
                                        data={data}
                                        openPopup={openPopup}
                                   />
                              ))}
                         </Suspense>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading={t("translation.title")}>
                         <Suspense fallback={(
                              <>
                              {Array.from({length: 2}).map((_,i)=><Skeleton className="h-8 w-full" key={`translation-${i+1}-loader`}/>)}
                              </>
                         )}>
                              {getTranslationActions(t).map((data,i)=>(
                                   <CommandsPopupItem
                                        key={`translation-${i+1}`}
                                        data={data}
                                        openPopup={openPopup}
                                   />
                              ))}
                         </Suspense>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading={t("view.title")}>
                         <Suspense fallback={(
                              <>
                              {Array.from({length: 4}).map((_,i)=><Skeleton className="h-8 w-full" key={`view-${i+1}-loader`}/>)}
                              </>
                         )}>
                              {getViewActions(t).map((data,i)=>(
                                   <CommandsPopupItem
                                        key={`view-${i+1}`}
                                        data={data}
                                        openPopup={openPopup}
                                   />
                              ))}
                         </Suspense>
                    </CommandGroup>
               </CommandList>
          </Command>
     )
}