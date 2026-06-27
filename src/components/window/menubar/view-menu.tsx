import { MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";
import { useTreeSidebar } from "@/context/tree-sidebar";
import ViewActions from "@/actions/view";
import { useGlossary } from "@/context/glossary";
import { useEditor } from "@/context/editor";
import { useTranslation } from "react-i18next";

export default function ViewMenu(){
     const {t} = useTranslation("menubar")
     const {setOpen: setOpenTree} = useTreeSidebar()
     const {setOpen: setOpenGlossary} = useGlossary()
     const {setMissingOnly} = useEditor()
     return (
          <MenubarMenu>
               <MenubarTrigger className="tracking-tight">{t("view.title")}</MenubarTrigger>
               <MenubarContent>
                    <MenubarSub>
                         <MenubarSubTrigger>{t("view.sidebar.title")}</MenubarSubTrigger>
                         <MenubarSubContent>
                              <MenubarItem onClick={()=>setOpenTree(prev=>!prev)}>{t("view.sidebar.translation")}</MenubarItem>
                              <MenubarItem onClick={()=>setOpenGlossary(prev=>!prev)}>{t("view.sidebar.glossary")}</MenubarItem>
                         </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem onClick={()=>setMissingOnly(prev => !prev)}>{t("view.toggle-missing")}</MenubarItem>
                    <MenubarSub>
                         <MenubarSubTrigger>{t("view.zoom.title")}</MenubarSubTrigger>
                         <MenubarSubContent>
                              <MenubarItem onClick={ViewActions.zoomIn}>
                                   {t("view.zoom.in")}
                                   <MenubarShortcut>Ctrl+Plus</MenubarShortcut>
                              </MenubarItem>
                              <MenubarItem onClick={ViewActions.zoomOut}>
                                   {t("view.zoom.out")}
                                   <MenubarShortcut>Ctrl+Minus</MenubarShortcut>
                              </MenubarItem>
                              <MenubarItem onClick={ViewActions.resetZoom}>
                                   {t("view.zoom.reset")}
                                   <MenubarShortcut>Ctrl+0</MenubarShortcut>
                              </MenubarItem>
                         </MenubarSubContent>
                    </MenubarSub>
               </MenubarContent>
          </MenubarMenu>
     )
}