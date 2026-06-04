import { MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "../../ui/menubar";
import { useTreeSidebar } from "@/context/sidebar";
import ViewActions from "@/actions/view";
import { useAppTranslation } from "@/context/translation";

export default function ViewMenu(){
     const {setOpen} = useTreeSidebar()
     const {setMissingOnly} = useAppTranslation()
     return (
          <MenubarMenu>
               <MenubarTrigger className="tracking-tight">View</MenubarTrigger>
               <MenubarContent>
                    <MenubarItem onClick={()=>setOpen(prev=>!prev)}>Toggle Sidebar</MenubarItem>
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