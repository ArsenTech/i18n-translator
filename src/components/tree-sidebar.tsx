import { ChevronRight, Folder, FileText } from "lucide-react"
import { Button, ButtonProps } from "./ui/button"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useState } from "react"

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

export default function TreeSidebar() {
     return (
          <ScrollArea className="bg-card text-card-foreground border shadow-xs rounded-md flex-1 min-h-0 h-full">
               <div className="p-2">
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
               </div>
               <ScrollBar orientation="vertical"/>
               <ScrollBar orientation="horizontal"/>
          </ScrollArea>
     )
}