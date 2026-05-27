import { ChevronRight, Folder, List } from "lucide-react"
import { Button, ButtonProps } from "./ui/button"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetFooter } from "./ui/sheet"
import { TreeNode } from "@/lib/types"
import { useTreeSidebar } from "@/context/sidebar"

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

function TreeSidebarButton({variant="ghost", size="sm", className, selected, ...props}: ButtonProps & {selected?: boolean}) {
     return (
          <Button
               variant={selected ? "secondary" : variant}
               size={size}
               className={cn("w-full justify-start gap-2",className)}
               {...props}
          />
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
     return content
}

interface TreeNodeItemProps{
     node: TreeNode
     selectedNamespace: string
     onSelectNamespace: (namespace: string) => void
}
function TreeNodeItem({node, onSelectNamespace, selectedNamespace}: TreeNodeItemProps){
     const [open, setOpen] = useState(node.name === "Root")
     const hasChildren = node.children.length > 0
     const selected = selectedNamespace === node.fullPath
     const {setOpen: setSidebarOpen} = useTreeSidebar()
     return (
          <TreeSidebarItem>
               <Collapsible open={open} onOpenChange={setOpen}>
                    <div className="flex items-center gap-1">
                         {hasChildren ? (
                              <CollapsibleTrigger asChild>
                                   <TreeSidebarButton>
                                        <ChevronRight className={cn("size-4 transition-transform",open &&"rotate-90")} />
                                        <Folder className="size-4" />
                                        {node.name}
                                   </TreeSidebarButton>
                              </CollapsibleTrigger>
                         ) : (
                              <TreeSidebarButton
                                   variant="ghost"
                                   selected={selected}
                                   onClick={() => {
                                        onSelectNamespace(node.fullPath)
                                        setSidebarOpen(false)
                                   }}
                              >
                                   <List className="size-4" />
                                   {node.name}
                              </TreeSidebarButton>
                         )}
                    </div>
                    {hasChildren && (
                         <CollapsibleContent>
                              <TreeSidebarSubmenu>
                                   {node.children.map(child => (
                                        <TreeNodeItem
                                             key={child.fullPath}
                                             node={child}
                                             onSelectNamespace={onSelectNamespace}
                                             selectedNamespace={selectedNamespace}
                                        />
                                   ))}
                              </TreeSidebarSubmenu>
                         </CollapsibleContent>
                    )}
               </Collapsible>
          </TreeSidebarItem>
     )
}

interface TreeSidebarProps{
     tree: TreeNode[]
     selectedNamespace: string
     onSelectNamespace: (namespace: string) => void
}
export default function TreeSidebar({tree, onSelectNamespace, selectedNamespace}: TreeSidebarProps) {
     const {setOpen} = useTreeSidebar()
     return (
          <TreeSidebarContainer>
               <TreeSidebarMenu>
                    <TreeSidebarItem>
                         <TreeSidebarButton
                              variant="ghost"
                              selected={selectedNamespace===""}
                              onClick={() => {
                                   onSelectNamespace("")
                                   setOpen(false)
                              }}
                         >
                              <List className="size-4" />
                              Show All
                         </TreeSidebarButton>
                    </TreeSidebarItem>
                    {tree.map(node => (
                         <TreeNodeItem
                              key={node.fullPath}
                              node={node}
                              onSelectNamespace={onSelectNamespace}
                              selectedNamespace={selectedNamespace}
                         />
                    ))}
               </TreeSidebarMenu>
          </TreeSidebarContainer>
     )
}