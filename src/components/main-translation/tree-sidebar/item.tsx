import { CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { useTreeSidebar } from "@/context/tree-sidebar"
import type { TreeNode } from "@/lib/types/data"
import { cn } from "@/lib/utils"
import { ChevronRight, Folder, List } from "lucide-react"
import { Collapsible } from "@/components/ui/collapsible"
import React, { useState } from "react"
import { TreeSidebarItem, TreeSidebarButton, TreeSidebarSubmenu } from "."
import { useEditor } from "@/context/editor"
import { useTranslation } from "react-i18next"

interface TreeNodeItemProps{
     node: TreeNode
}
const TreeNodeItem = React.memo(({node}: TreeNodeItemProps) => {
     const {t} = useTranslation()
     const {selectedNamespace, setSelectedNamespace} = useEditor()
     const [open, setOpen] = useState(node.name === t("tree-sidebar.root"))
     const hasChildren = node.children.length > 0
     const selected = selectedNamespace === node.fullPath
     const {closeMobileSidebar} = useTreeSidebar()
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
                                        setSelectedNamespace(node.fullPath)
                                        closeMobileSidebar()
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
                                        />
                                   ))}
                              </TreeSidebarSubmenu>
                         </CollapsibleContent>
                    )}
               </Collapsible>
          </TreeSidebarItem>
     )
})

export default TreeNodeItem