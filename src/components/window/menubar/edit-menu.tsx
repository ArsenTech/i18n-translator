import { MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import ReplaceTranslationPopup from "@/popups/replace-translation";
import BatchRenameKeysPopup from "@/popups/batch-rename-keys";
import EditActions from "@/actions/edit";
import FindSubmenu from "./find-submenu";
import { useAppTranslation } from "@/context/translation";
import AddToGlossaryPopup from "@/popups/add-to-glossary";

export default function EditMenu(){
     const {inputRef, table, setSelectedKeys} = useAppTranslation()
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
                    </MenubarGroup>
                    <MenubarSeparator/>
                    <MenubarGroup>
                         <MenubarItem onClick={()=>EditActions.selectUntranslated(table, setSelectedKeys)}>Select untranslated</MenubarItem>
                         <MenubarItem onClick={()=>EditActions.clearSelection(setSelectedKeys)}>Clear Selection <MenubarShortcut>Esc</MenubarShortcut></MenubarItem>
                         <AddToGlossaryPopup triggerButton={(
                              <MenubarItem onSelect={(e) => e.preventDefault()}>Add to Glossary</MenubarItem>
                         )}/>
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