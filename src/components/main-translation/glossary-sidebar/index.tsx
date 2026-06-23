import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn, getErrorMessage } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetFooter } from "@/components/ui/sheet"
import type { GlossaryEntry } from "@/lib/types/data"
import React, { Suspense, useEffect, useMemo, useTransition } from "react"
import { SIDEBAR_WIDTH_MOBILE } from "@/lib/constants"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty"
import { useGlossary } from "@/context/glossary"
import LoadingButton from "../../loading-button"
import GlossaryActions from "@/lib/store/glossary"
import { useAppTranslation } from "@/context/translation"
import { toast } from "sonner"
import { findValue } from "@/lib/helpers"
import { GlossarySidebarItem } from "./item"
import { GlossarySidebarLoader } from "@/loaders/glossary"
import { useSettings } from "@/context/settings"

function GlossarySidebarMenu({children}: {children: React.ReactNode}){
     return (
          <ul className="space-y-1.5 flex-1">{children}</ul>
     )
}

function GlossarySidebarContainer({children}: {children: React.ReactNode}){
     const {currTranslation, setInput} = useAppTranslation()
     const {settings} = useSettings()
     const {isMobile, open, setOpen, showType, setShowType, glossary, closeMobileSidebar} = useGlossary()
     const glossaryItems = useMemo(() => {
          return glossary.map(item => ({
               ...item,
               found: currTranslation
                    ? findValue(currTranslation.baseString, item.term, item.caseSensitive) ||
                    findValue(currTranslation.translationString, item.translation, item.caseSensitive)
                    : false,
          })).filter(val=>showType==="few" ? val.found : true)
     }, [glossary, currTranslation])
     const applyAllMatches = () => {
          if (!currTranslation) return;
          setInput(prev => {
               let result = prev.trim() === "" ? currTranslation.baseString : prev;
               for (const item of glossaryItems) {
                    if (item.caseSensitive) {
                         result = result.replaceAll(
                              item.term,
                              item.translation
                         );
                    } else {
                         result = result.replace(
                              new RegExp(
                                   item.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                                   "gi"
                              ),
                              item.translation
                         );
                    }
               }
               return result;
          });
          closeMobileSidebar()
     };
     const content = (
          <div className="w-full flex flex-col gap-2 min-h-0 overflow-hidden">
               <h2 className="text-lg font-semibold">Glossary ({glossaryItems.length})</h2>
               {settings.defaultGlossaryView!=="all" && (
                    <p className="text-sm text-muted-foreground">Total: {glossary.length}</p>
               )}
               <ScrollArea className={cn(
                    "min-h-0 h-full flex-1",
               )}>
                    {children}
                    <ScrollBar orientation="vertical"/>
                    <ScrollBar orientation="horizontal"/>
               </ScrollArea>
               {!isMobile && (
                    <div className="flex items-center gap-0.5 flex-wrap">
                         <Button className="flex-1" disabled={glossaryItems.length<=0} onClick={applyAllMatches}>Apply All</Button>
                         <Button className="flex-1" variant="secondary" disabled={glossary.length<=0} onClick={()=>setShowType(prev=>prev==="all" ? "few" : "all")}>
                              {showType!=="all" ? "Show All" : "Show Few"}
                         </Button>
                    </div>
               )}
          </div>
     )
     if (isMobile) {
          return (
               <Sheet open={open} onOpenChange={setOpen}>
                    <SheetContent
                         data-sidebar="sidebar"
                         data-slot="sidebar"
                         data-mobile="true"
                         className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
                         style={{
                              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
                         } as React.CSSProperties}
                         side="right"
                    >
                         <SheetHeader className="sr-only">
                              <SheetTitle>Glossary Sidebar</SheetTitle>
                              <SheetDescription>Displays the mobile sidebar.</SheetDescription>
                         </SheetHeader>
                         <div className="flex h-full w-full flex-col min-h-0 p-2">
                              {content}
                         </div>
                         <SheetFooter>
                              <div className="flex items-center gap-0.5 flex-wrap">
                                   <Button className="flex-1" disabled={glossaryItems.length<=0} onClick={applyAllMatches}>Apply All</Button>
                                   <Button className="flex-1" variant="secondary" disabled={glossary.length<=0} onClick={()=>setShowType(prev=>prev==="all" ? "few" : "all")}>
                                        {showType!=="all" ? "Show All" : "Show Few"}
                                   </Button>
                              </div>
                              <SheetClose asChild>
                                   <Button variant="outline">Close</Button>
                              </SheetClose>
                         </SheetFooter>
                    </SheetContent>
               </Sheet>
          )
     }
     return open ? content : null
}

interface GlossarySidebarProps{
     glossary: GlossaryEntry[]
}
export default function GlossarySidebar({glossary}: GlossarySidebarProps) {
     const [isLoading, startTransition] = useTransition()
     const {langs, currTranslation, setInput} = useAppTranslation()
     const {setGlossary, showType, closeMobileSidebar} = useGlossary()
     const loadPack = () => {
          startTransition(async()=>{
               try {
                    const data = await GlossaryActions.getGlossary(langs)
                    if(data.length<=0) throw new Error("Glossary is still empty")
                    setGlossary(data)
               } catch (err) {
                    toast.error("Failed to load the glossary",{
                         description: getErrorMessage(err),
                         id: "glossary-load-error"
                    })
               }
          })
     }
     const sorted = useMemo(()=>[...glossary].sort((a, b) =>
          a.term.localeCompare(b.term)
     ),[glossary]);
     const glossaryItems = useMemo(() => {
          return sorted.map(item => ({
               ...item,
               found: currTranslation
                    ? findValue(currTranslation.baseString, item.term, item.caseSensitive) ||
                    findValue(currTranslation.translationString, item.translation, item.caseSensitive)
                    : false,
          })).filter(val=>showType==="few" ? val.found : true)
     }, [sorted, currTranslation])
     useEffect(() => {
          if (!langs.base || !langs.target) return;
          loadPack();
     }, [langs.base, langs.target]);
     const applyMatch = (item: GlossaryEntry) => {
          if (!currTranslation) return;
          setInput(prev => {
               if (prev.trim() === "") {
                    return item.translation
               }
               if(!findValue(prev,item.term,item.caseSensitive)){
                    return prev.concat(item.translation)
               }
               return item.caseSensitive
                    ? prev.replaceAll(item.term, item.translation)
                    : prev.replace(
                         new RegExp(
                              item.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                              "gi"
                         ),
                         item.translation
                    );
          });
          closeMobileSidebar();
     }
     return (
          <GlossarySidebarContainer>
               {glossaryItems.length<=0 ? (
                    <Empty>
                         <EmptyHeader>
                              <EmptyMedia variant="icon">
                                   <Languages/>
                              </EmptyMedia>
                              <EmptyTitle>No glossary entries found.</EmptyTitle>
                              <EmptyDescription>Select a translation key or load a local glossary pack.</EmptyDescription>
                         </EmptyHeader>
                         <EmptyContent>
                              <LoadingButton disabled={glossary.length>0} isLoading={isLoading} onClick={loadPack}>Load pack</LoadingButton>
                         </EmptyContent>
                    </Empty>
               ) : (
                    <GlossarySidebarMenu>
                         <Suspense fallback={(
                              <>
                              {Array.from({length: 12}).map((_,i)=>(
                                   <GlossarySidebarLoader key={i+1}/>
                              ))}
                              </>
                         )}>
                              {glossaryItems.map(item=>(
                                   <GlossarySidebarItem
                                        key={`${item.domain}-${item.partOfSpeech}-${item.term}-${item.translation}`}
                                        data={item}
                                        found={item.found}
                                        onSelect={applyMatch}
                                   />
                              ))}
                         </Suspense>
                    </GlossarySidebarMenu>
               )}
          </GlossarySidebarContainer>
     )
}