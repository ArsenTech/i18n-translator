import { ChevronRight, Folder, FileText, Menu } from "lucide-react"
import { Button, ButtonProps } from "./ui/button"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetClose, SheetFooter } from "./ui/sheet"

const SIDEBAR_WIDTH_MOBILE = "18rem"

function TreeSidebarMenu({children}: {children: React.ReactNode}){
     return (
          <ul className="flex flex-col gap-1">{children}</ul>
     )
}

function TreeSidebarItem({children}: {children: React.ReactNode}){
     return (
          <li className="relative">{children}</li>
     )
}

function TreeSidebarSubmenu({children}: {children: React.ReactNode}){
     return (
          <ul className="ml-4 flex flex-col gap-1 border-l pl-2">{children}</ul>
     )
}

function TreeSidebarButton({variant="ghost", size="sm", className, ...props}: ButtonProps) {
     return (
          <Button
               variant={variant}
               size={size}
               className={cn("w-full justify-start gap-2",className)}
               {...props}
          />
     )
}

interface TreeSidebarCollapsibleProps{
     name: string,
     children: React.ReactNode
}
function TreeSidebarCollapsible({name, children}: TreeSidebarCollapsibleProps){
     const [open, setOpen] = useState(false);
     return (
          <Collapsible open={open} onOpenChange={setOpen}>
               <TreeSidebarItem>
                    <CollapsibleTrigger asChild>
                         <TreeSidebarButton>
                              <ChevronRight className={cn("size-4 transition-transform",open &&"rotate-90")} />
                              <Folder className="size-4" />
                              {name}
                         </TreeSidebarButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                         {children}
                    </CollapsibleContent>
               </TreeSidebarItem>
          </Collapsible>
     )
}

function TreeSidebarContainer({children}: {children: React.ReactNode}){
     const isMobile = useIsMobile()
     const content = (
          <ScrollArea className={cn(
               "flex-1 min-h-0 h-full",
               !isMobile && "bg-card text-card-foreground border shadow-xs rounded-md"
          )}>
               <div className="p-2">
                    {children}
               </div>
               <ScrollBar orientation="vertical"/>
               <ScrollBar orientation="horizontal"/>
          </ScrollArea>
     )
     if (isMobile) {
          return (
               <Sheet>
                    <SheetTrigger asChild>
                         <Button variant="outline" size="icon" title="Toggle Sidebar">
                              <Menu/>
                         </Button>
                    </SheetTrigger>
                    <SheetContent
                         data-sidebar="sidebar"
                         data-slot="sidebar"
                         data-mobile="true"
                         className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
                         style={{
                              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
                         } as React.CSSProperties}
                         side="left"
                    >
                         <SheetHeader className="sr-only">
                              <SheetTitle>Sidebar</SheetTitle>
                              <SheetDescription>Displays the mobile sidebar.</SheetDescription>
                         </SheetHeader>
                         <div className="flex h-full w-full flex-col min-h-0">
                              {content}
                         </div>
                         <SheetFooter>
                              <SheetClose asChild>
                                   <Button variant="outline">Close</Button>
                              </SheetClose>
                         </SheetFooter>
                    </SheetContent>
               </Sheet>
          )
     }
     return content
}

export default function TreeSidebar() {
     return (
          <TreeSidebarContainer>
               <TreeSidebarMenu>
                    <TreeSidebarCollapsible name="common">
                         <TreeSidebarSubmenu>
                              <TreeSidebarItem>
                                   <TreeSidebarButton>
                                        <FileText className="size-4" />
                                        buttons.save
                                   </TreeSidebarButton>
                              </TreeSidebarItem>
                              <TreeSidebarItem>
                                   <TreeSidebarButton>
                                        <FileText className="size-4" />
                                        buttons.save
                                   </TreeSidebarButton>
                              </TreeSidebarItem>
                         </TreeSidebarSubmenu>
                    </TreeSidebarCollapsible>
               </TreeSidebarMenu>
          </TreeSidebarContainer>
     )
}