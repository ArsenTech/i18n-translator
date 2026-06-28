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
     const {t} = useTranslation("menubar",{
          keyPrefix: "edit"
     })
     const {t: validationTxt} = useTranslation("validation")
     const {inputRef, setSelectedKeys} = useEditor()
     const {table} = useAppTranslation()
     return (
          <MenubarMenu>
               <MenubarTrigger className="tracking-tight">{t("title")}</MenubarTrigger>
               <MenubarContent>
                    <MenubarGroup>
                         <MenubarItem onClick={EditActions.undo}>
                              {t("undo")}
                              <MenubarShortcut>Ctrl+Z</MenubarShortcut>
                         </MenubarItem>
                         <MenubarItem onClick={EditActions.redo}>
                              {t("redo")}
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
                                        {t("replace")}
                                        <MenubarShortcut>Ctrl+R</MenubarShortcut>
                                   </MenubarItem>
                              )}/>
                              <BatchRenameKeysPopup triggerButton={(
                                   <MenubarItem onSelect={(e) => e.preventDefault()}>
                                        {t("batch-rename")}
                                        <MenubarShortcut>Ctrl+Shift+R</MenubarShortcut>
                                   </MenubarItem>
                              )}/>
                         </Suspense>
                    </MenubarGroup>
                    <MenubarSeparator/>
                    <MenubarGroup>
                         <MenubarItem onClick={()=>EditActions.selectUntranslated(table, setSelectedKeys)}>{t("select-untranslated")}</MenubarItem>
                         <MenubarItem onClick={()=>EditActions.clearSelection(setSelectedKeys)}>
                              {t("clear-selection")}
                              <MenubarShortcut>Esc</MenubarShortcut>
                         </MenubarItem>
                         <Suspense fallback={<Skeleton className="h-5 w-full max-w-48 my-1.5"/>}>
                              <AddToGlossaryPopup triggerButton={(
                                   <MenubarItem onSelect={(e) => e.preventDefault()}>{t("add-glossary")}</MenubarItem>
                              )}/>
                         </Suspense>
                    </MenubarGroup>
                    <MenubarSeparator />
                    <MenubarGroup>
                         <MenubarItem onClick={()=>EditActions.cut(inputRef.current, validationTxt)}>
                              {t("cut")}
                              <MenubarShortcut>Ctrl+X</MenubarShortcut>
                         </MenubarItem>
                         <MenubarItem onClick={()=>EditActions.copy(inputRef.current, validationTxt)}>
                              {t("copy")}
                              <MenubarShortcut>Ctrl+C</MenubarShortcut>
                         </MenubarItem>
                         <MenubarItem onClick={()=>EditActions.paste(inputRef.current, validationTxt)}>
                              {t("paste")}
                              <MenubarShortcut>Ctrl+V</MenubarShortcut>
                         </MenubarItem>
                         <MenubarItem onClick={()=>EditActions.selectAll(table, setSelectedKeys)}>
                              {t("select-all")}
                              <MenubarShortcut>Ctrl+A</MenubarShortcut>
                         </MenubarItem>
                    </MenubarGroup>
               </MenubarContent>
          </MenubarMenu>
     )
}