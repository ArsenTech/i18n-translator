import { ArrowRight, CheckCircle, Dot, Languages } from "lucide-react"
import { Button } from "../ui/button"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetFooter } from "../ui/sheet"
import { GlossaryItem } from "@/lib/types"
import React from "react"
import { SIDEBAR_WIDTH_MOBILE } from "@/lib/constants"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "../ui/empty"
import { useGlossarySidebar } from "@/context/glossary-sidebar"

function GlossarySidebarMenu({children}: {children: React.ReactNode}){
     return (
          <ul className="space-y-1.5 flex-1">{children}</ul>
     )
}

interface GlossarySidearItemProps {
     data: GlossaryItem
}
function GlossarySidebarItem({data}: GlossarySidearItemProps){
     return (
          <li className="space-y-1 first:pt-2 pb-2 border-b last:pb-0 last:border-b-0 text-center">
               <div className="grid grid-cols-[1fr_16px_1fr] gap-2 place-items-center">
                    <p className="text-sm font-semibold inline-block">{data.source}</p>
                    {data.found ? (
                         <CheckCircle className="size-4 text-emerald-600 dark:text-emerald-400"/>
                    ) : (
                         <ArrowRight className="size-4 text-muted-foreground"/>
                    )}
                    <p className="text-sm inline-block">{data.target}</p>
               </div>
               <div className={cn("grid grid-cols-[1fr_16px_1fr] gap-2 place-items-center",data.found ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground")}>
                    <p className="italic text-xs">{data.partOfSpeech}</p>
                    <Dot className="size-4"/>
                    <p className="text-xs">{data.domain}</p>
               </div>
          </li>
     )
}
function GlossarySidebarContainer({children, count}: {children: React.ReactNode, count: number}){
     const {isMobile, open, setOpen} = useGlossarySidebar()
     const content = (
          <div className="w-full flex flex-col gap-2 min-h-0 overflow-hidden">
               <h2 className="text-lg font-semibold">Glossary ({count})</h2>
               <ScrollArea className={cn(
                    "min-h-0 h-full flex-1",
               )}>
                    {children}
                    <ScrollBar orientation="vertical"/>
                    <ScrollBar orientation="horizontal"/>
               </ScrollArea>
               {!isMobile && (
                    <Button className="w-full" disabled={count<=0}>Apply</Button>
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
                              <Button className="w-full">Apply</Button>
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
     glossary: GlossaryItem[]
}
export default function GlossarySidebar({glossary}: GlossarySidebarProps) {
     return (
          <GlossarySidebarContainer count={glossary.length}>
               {glossary.length<=0 ? (
                    <Empty>
                         <EmptyHeader>
                              <EmptyMedia variant="icon">
                                   <Languages/>
                              </EmptyMedia>
                              <EmptyTitle>No glossary entries found.</EmptyTitle>
                              <EmptyDescription>Select a translation key or load a local glossary pack.</EmptyDescription>
                         </EmptyHeader>
                         <EmptyContent>
                              <Button>Load a pack</Button>
                         </EmptyContent>
                    </Empty>
               ) : (
                    <GlossarySidebarMenu>
                         {glossary.map(item=>(
                              <GlossarySidebarItem key={`${item.domain}-${item.source}`} data={item}/>
                         ))}
                    </GlossarySidebarMenu>
               )}
          </GlossarySidebarContainer>
     )
}