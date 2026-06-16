import { MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "../../ui/menubar";
import { useTreeSidebar } from "@/context/tree-sidebar";
import ViewActions from "@/actions/view";
import { useAppTranslation } from "@/context/translation";
import { useGlossary } from "@/context/glossary-sidebar";

export default function ViewMenu(){
     const {setOpen: setOpenTree} = useTreeSidebar()
     const {setOpen: setOpenGlossary} = useGlossary()
     const {setMissingOnly} = useAppTranslation()
     return (
          <MenubarMenu>
               <MenubarTrigger className="tracking-tight">View</MenubarTrigger>
               <MenubarContent>
                    <MenubarSub>
                         <MenubarSubTrigger>Toggle Sidebar</MenubarSubTrigger>
                         <MenubarSubContent>
                              <MenubarItem onClick={()=>setOpenTree(prev=>!prev)}>Translation Tree</MenubarItem>
                              <MenubarItem onClick={()=>setOpenGlossary(prev=>!prev)}>Glossary</MenubarItem>
                         </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem onClick={()=>setMissingOnly(prev => !prev)}>Toggle Missing Only</MenubarItem>
                    <MenubarSub>
                         <MenubarSubTrigger>Zoom</MenubarSubTrigger>
                         <MenubarSubContent>
                              <MenubarItem onClick={ViewActions.zoomIn}>
                                   Zoom In
                                   <MenubarShortcut>Ctrl+Plus</MenubarShortcut>
                              </MenubarItem>
                              <MenubarItem onClick={ViewActions.zoomOut}>
                                   Zoom Out
                                   <MenubarShortcut>Ctrl+Minus</MenubarShortcut>
                              </MenubarItem>
                              <MenubarItem onClick={ViewActions.resetZoom}>
                                   Reset Zoom
                                   <MenubarShortcut>Ctrl+0</MenubarShortcut>
                              </MenubarItem>
                         </MenubarSubContent>
                    </MenubarSub>
               </MenubarContent>
          </MenubarMenu>
     )
}