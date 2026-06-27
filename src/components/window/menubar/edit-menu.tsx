import { MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import EditActions from "@/actions/edit";
import { useAppTranslation } from "@/context/translation";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEditor } from "@/context/editor";
import { useTranslation } from "react-i18next";

const ReplaceTranslationPopup = lazy(()=>import("@/popups/replace-translation"));
const BatchRenameKeysPopup = lazy(()=>import("@/popups/batch-rename-keys"));
const AddToGlossaryPopup = lazy(()=>import("@/popups/add-to-glossary"));
const FindSubmenu = lazy(()=>import("./find-submenu"));

export default function EditMenu(){
     const {t} = useTranslation("menubar")
     const {inputRef, setSelectedKeys} = useEditor()
     const {table} = useAppTranslation()
     return (
          <MenubarMenu>
               <MenubarTrigger className="tracking-tight">{t("edit.title")}</MenubarTrigger>
               <MenubarContent>
                    <MenubarGroup>
                         <MenubarItem onClick={EditActions.undo}>
                              {t("edit.undo")}
                              <MenubarShortcut>Ctrl+Z</MenubarShortcut>
                         </MenubarItem>
                         <MenubarItem onClick={EditActions.redo}>
                              {t("edit.redo")}
                              <MenubarShortcut>Ctrl+Y</MenubarShortcut>
                         </MenubarItem>
                    </MenubarGroup>
                    <MenubarSeparator />
                    <MenubarGroup>
                         <Suspense fallback={(
                              <>
                              <Skeleton className="h-5 w-full max-w-48 my-1.5"/>
                              <Skeleton className="h-5 w-full max-w-48 my-1.5"/>
                              <Skeleton className="h-5 w-full max-w-48 my-1.5"/>
                              </>
                         )}>
                              <FindSubmenu/>
                              <ReplaceTranslationPopup triggerButton={(
                                   <MenubarItem onSelect={(e) => e.preventDefault()}>
                                        {t("edit.replace")}
                                        <MenubarShortcut>Ctrl+R</MenubarShortcut>
                                   </MenubarItem>
                              )}/>
                              <BatchRenameKeysPopup triggerButton={(
                                   <MenubarItem onSelect={(e) => e.preventDefault()}>
                                        {t("edit.batch-rename")}
                                        <MenubarShortcut>Ctrl+Shift+R</MenubarShortcut>
                                   </MenubarItem>
                              )}/>
                         </Suspense>
                    </MenubarGroup>
                    <MenubarSeparator/>
                    <MenubarGroup>
                         <MenubarItem onClick={()=>EditActions.selectUntranslated(table, setSelectedKeys)}>{t("edit.select-untranslated")}</MenubarItem>
                         <MenubarItem onClick={()=>EditActions.clearSelection(setSelectedKeys)}>
                              {t("edit.clear-selection")}
                              <MenubarShortcut>Esc</MenubarShortcut>
                         </MenubarItem>
                         <Suspense fallback={<Skeleton className="h-5 w-full max-w-48 my-1.5"/>}>
                              <AddToGlossaryPopup triggerButton={(
                                   <MenubarItem onSelect={(e) => e.preventDefault()}>{t("edit.add-glossary")}</MenubarItem>
                              )}/>
                         </Suspense>
                    </MenubarGroup>
                    <MenubarSeparator />
                    <MenubarGroup>
                         <MenubarItem onClick={()=>EditActions.cut(inputRef.current)}>
                              {t("edit.cut")}
                              <MenubarShortcut>Ctrl+X</MenubarShortcut>
                         </MenubarItem>
                         <MenubarItem onClick={()=>EditActions.copy(inputRef.current)}>
                              {t("edit.copy")}
                              <MenubarShortcut>Ctrl+C</MenubarShortcut>
                         </MenubarItem>
                         <MenubarItem onClick={()=>EditActions.paste(inputRef.current)}>
                              {t("edit.paste")}
                              <MenubarShortcut>Ctrl+V</MenubarShortcut>
                         </MenubarItem>
                         <MenubarItem onClick={()=>EditActions.selectAll(table, setSelectedKeys)}>
                              {t("edit.select-all")}
                              <MenubarShortcut>Ctrl+A</MenubarShortcut>
                         </MenubarItem>
                    </MenubarGroup>
               </MenubarContent>
          </MenubarMenu>
     )
}