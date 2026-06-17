import { ArrowRight, CheckCircle, Dot, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn, getErrorMessage } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetFooter } from "@/components/ui/sheet"
import type { GlossaryEntry } from "@/lib/types/data"
import React, { useEffect, useMemo, useTransition } from "react"
import { SIDEBAR_WIDTH_MOBILE } from "@/lib/constants"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty"
import { useGlossary } from "@/context/glossary"
import LoadingButton from "../loading-button"
import GlossaryActions from "@/lib/store/glossary"
import { useAppTranslation } from "@/context/translation"
import { toast } from "sonner"
import { findValue } from "@/lib/helpers"
import { ButtonGroup } from "@/components/ui/button-group"

function GlossarySidebarMenu({children}: {children: React.ReactNode}){
     return (
          <ul className="space-y-1.5 flex-1">{children}</ul>
     )
}

interface GlossarySidebarItemProps {
     data: GlossaryEntry,
     found?: boolean
}
function GlossarySidebarItem({data, found=false}: GlossarySidebarItemProps){
     return (
          <li className="space-y-1 first:pt-2 pb-2 border-b last:pb-0 last:border-b-0 text-center">
               <div className="grid grid-cols-[1fr_16px_1fr] gap-2 place-items-center">
                    <p className="text-sm font-semibold inline-block">{data.term}</p>
                    {found ? (
                         <CheckCircle className="size-4 text-emerald-600 dark:text-emerald-400"/>
                    ) : (
                         <ArrowRight className="size-4 text-muted-foreground"/>
                    )}
                    <p className="text-sm inline-block">{data.translation}</p>
               </div>
               <div className={cn("grid grid-cols-[1fr_16px_1fr] gap-2 place-items-center", found ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground")}>
                    <p className="italic text-xs">{data.partOfSpeech}</p>
                    <Dot className="size-4"/>
                    <p className="text-xs">{data.domain}</p>
               </div>
          </li>
     )
}
function GlossarySidebarContainer({children, count, total}: {children: React.ReactNode, count: number, total: number}){
     const {isMobile, open, setOpen, showType, setShowType} = useGlossary()
     const content = (
          <div className="w-full flex flex-col gap-2 min-h-0 overflow-hidden">
               <h2 className="text-lg font-semibold">Glossary ({count})</h2>
               <p className="text-sm text-muted-foreground">Total: {total}</p>
               <ScrollArea className={cn(
                    "min-h-0 h-full flex-1",
               )}>
                    {children}
                    <ScrollBar orientation="vertical"/>
                    <ScrollBar orientation="horizontal"/>
               </ScrollArea>
               {!isMobile && (
                    <ButtonGroup className="w-full">
                         <Button className="flex-1" disabled={count<=0}>Apply</Button>
                         <Button className="flex-1" variant="secondary" disabled={total<=0} onClick={()=>setShowType(prev=>prev==="all" ? "few" : "all")}>
                              {showType!=="all" ? "Show All" : "Show Few"}
                         </Button>
                    </ButtonGroup>
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
                              <ButtonGroup className="w-full">
                                   <Button className="flex-1" disabled={count<=0}>Apply</Button>
                                   <Button className="flex-1" variant="secondary" disabled={total<=0} onClick={()=>setShowType(prev=>prev==="all" ? "few" : "all")}>
                                        {showType!=="all" ? "Show All" : "Show Few"}
                                   </Button>
                              </ButtonGroup>
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
     const {langs, currTranslation} = useAppTranslation()
     const {setGlossary, showType} = useGlossary()
     const loadPack = () => {
          startTransition(async()=>{
               try {
                    const data = await GlossaryActions.getGlossary(langs)
                    if(data.length<=0) throw new Error("Glossary is still empty")
                    setGlossary(data)
               } catch (err) {
                    toast.error("Failed to load the glossary",{
                         description: getErrorMessage(err)
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
     return (
          <GlossarySidebarContainer count={glossaryItems.length} total={sorted.length}>
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
                         {glossaryItems.map(item=>(
                              <GlossarySidebarItem
                                   key={`${item.domain}-${item.partOfSpeech}-${item.term}-${item.translation}`}
                                   data={item}
                                   found={item.found}
                              />
                         ))}
                    </GlossarySidebarMenu>
               )}
          </GlossarySidebarContainer>
     )
}