import { MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import EditActions from "@/actions/edit";
import { useAppTranslation } from "@/context/translation";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEditor } from "@/context/editor";

const ReplaceTranslationPopup = lazy(()=>import("@/popups/replace-translation"));
const BatchRenameKeysPopup = lazy(()=>import("@/popups/batch-rename-keys"));
const AddToGlossaryPopup = lazy(()=>import("@/popups/add-to-glossary"));
const FindSubmenu = lazy(()=>import("./find-submenu"));

export default function EditMenu(){
     const {inputRef, setSelectedKeys} = useEditor()
     const {table} = useAppTranslation()
     return (
          <MenubarMenu>
               <MenubarTrigger className="tracking-tight">Edit</MenubarTrigger>
               <MenubarContent>
                    <MenubarGroup>
                         <MenubarItem onClick={EditActions.undo}>Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut></MenubarItem>
                         <MenubarItem onClick={EditActions.redo}>Redo <MenubarShortcut>Ctrl+Y</MenubarShortcut></MenubarItem>
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
                                        Replace Translation
                                        <MenubarShortcut>Ctrl+R</MenubarShortcut>
                                   </MenubarItem>
                              )}/>
                              <BatchRenameKeysPopup triggerButton={(
                                   <MenubarItem onSelect={(e) => e.preventDefault()}>
                                        Batch Rename Keys
                                        <MenubarShortcut>Ctrl+Shift+R</MenubarShortcut>
                                   </MenubarItem>
                              )}/>
                         </Suspense>
                    </MenubarGroup>
                    <MenubarSeparator/>
                    <MenubarGroup>
                         <MenubarItem onClick={()=>EditActions.selectUntranslated(table, setSelectedKeys)}>Select untranslated</MenubarItem>
                         <MenubarItem onClick={()=>EditActions.clearSelection(setSelectedKeys)}>Clear Selection <MenubarShortcut>Esc</MenubarShortcut></MenubarItem>
                         <Suspense fallback={<Skeleton className="h-5 w-full max-w-48 my-1.5"/>}>
                              <AddToGlossaryPopup triggerButton={(
                                   <MenubarItem onSelect={(e) => e.preventDefault()}>Add to Glossary</MenubarItem>
                              )}/>
                         </Suspense>
                    </MenubarGroup>
                    <MenubarSeparator />
                    <MenubarGroup>
                         <MenubarItem onClick={()=>EditActions.cut(inputRef.current)}>Cut <MenubarShortcut>Ctrl+X</MenubarShortcut></MenubarItem>
                         <MenubarItem onClick={()=>EditActions.copy(inputRef.current)}>Copy <MenubarShortcut>Ctrl+C</MenubarShortcut></MenubarItem>
                         <MenubarItem onClick={()=>EditActions.paste(inputRef.current)}>Paste <MenubarShortcut>Ctrl+V</MenubarShortcut></MenubarItem>
                         <MenubarItem onClick={()=>EditActions.selectAll(table, setSelectedKeys)}>Select All <MenubarShortcut>Ctrl+A</MenubarShortcut></MenubarItem>
                    </MenubarGroup>
               </MenubarContent>
          </MenubarMenu>
     )
}