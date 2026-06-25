import { List } from "lucide-react"
import { Button, ButtonProps } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Suspense } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetFooter } from "@/components/ui/sheet"
import { TreeNode } from "@/lib/types"
import { useTreeSidebar } from "@/context/tree-sidebar"
import React from "react"
import { SIDEBAR_WIDTH_MOBILE } from "@/lib/constants"
import TreeNodeItem from "./item"
import { TreeNodeLoader } from "@/loaders/tree-sidebar"
import { useEditor } from "@/context/editor"

export function TreeSidebarItem({children}: {children: React.ReactNode}){
     return (
          <li className="relative">{children}</li>
     )
}

export function TreeSidebarSubmenu({children}: {children: React.ReactNode}){
     return (
          <ul className="ml-4 flex flex-col gap-1 border-l pl-2">{children}</ul>
     )
}

export function TreeSidebarButton({variant="ghost", size="sm", className, selected, ...props}: ButtonProps & {selected?: boolean}) {
     return (
          <Button
               variant={selected ? "secondary" : variant}
               size={size}
               className={cn("w-full justify-start gap-2",className)}
               {...props}
          />
     )
}

function TreeSidebarMenu({children}: {children: React.ReactNode}){
     return (
          <ul className="flex flex-col gap-1">{children}</ul>
     )
}

function TreeSidebarContainer({children}: {children: React.ReactNode}){
     const {isMobile, open, setOpen} = useTreeSidebar()
     const content = (
          <ScrollArea className={cn(
               "min-h-0 h-full",
               !isMobile && "bg-card text-card-foreground border shadow-xs rounded-md md:flex-1"
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
               <Sheet open={open} onOpenChange={setOpen}>
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
     return open ? content : null
}

interface TreeSidebarProps{
     tree: TreeNode[]
}
export default function TreeSidebar({tree}: TreeSidebarProps) {
     const {closeMobileSidebar} = useTreeSidebar()
     const {selectedNamespace, setSelectedNamespace} = useEditor()
     return (
          <TreeSidebarContainer>
               <TreeSidebarMenu>
                    <TreeSidebarItem>
                         <TreeSidebarButton
                              variant="ghost"
                              selected={selectedNamespace===""}
                              onClick={() => {
                                   setSelectedNamespace("")
                                   closeMobileSidebar()
                              }}
                         >
                              <List className="size-4" />
                              Show All
                         </TreeSidebarButton>
                    </TreeSidebarItem>
                    <Suspense fallback={(
                         <>
                         {Array.from({ length: 5 }).map((_, i) => (
                              <TreeNodeLoader key={i} />
                         ))}
                         </>
                    )}>
                         {tree.map(node => (
                              <TreeNodeItem
                                   key={node.fullPath}
                                   node={node}
                              />
                         ))} 
                    </Suspense>
               </TreeSidebarMenu>
          </TreeSidebarContainer>
     )
}