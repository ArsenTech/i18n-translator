import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "../../ui/menubar";
import TranslatorActions from "@/actions/translator";
import ReplaceTranslationPopup from "@/popups/modals/replace-translation";
import BatchRenameKeysPopup from "@/popups/modals/batch-rename-keys";
import AutoTranslatePopup from "@/popups/modals/auto-translate";
import TransliterateScriptPopup from "@/popups/modals/transliterate-script";
import { PROVIDER_NAMES } from "@/lib/constants";
import { AutoTranslateProvider } from "@/schemas/types";
import SpellCheckPopup from "@/popups/modals/spell-check"
import CompareDifferencePopup from "@/popups/modals/compare-diff";
import FileMenu from "./file-menu";
import ViewMenu from "./view-menu";
import EditActions from "@/actions/edit";
import FindSubmenu from "./find-submenu";
import { useAppTranslation } from "@/context/translation";
import { toast } from "sonner";

export default function MenuBar(){
     const {setTable, table, baseKeys} = useAppTranslation()
     const removeUnusedKeys = () => {
          const res = TranslatorActions.removeUnusedKeys(table,baseKeys)
          if(res.success) {
               toast.success(res.success)
               setTable(res.data)
          }
     }
     const validateKeys = () => {
          const res = TranslatorActions.validateKeys(table, baseKeys)
          if (res.success) {
               toast.success("All keys are valid")
          } else {
               toast.error(`${res.count} invalid keys found`)
          }
     }
     return (
          <Menubar className="h-full border-0 bg-transparent shadow-none rounded-none">
               <FileMenu/>
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
                              <MenubarItem onClick={EditActions.selectUntranslated}>Select untranslated</MenubarItem>
                              <CompareDifferencePopup triggerButton={(
                                   <MenubarItem onSelect={(e) => e.preventDefault()}>Compare difference</MenubarItem>
                              )}/>
                         </MenubarGroup>
                         <MenubarSeparator />
                         <MenubarGroup>
                              <MenubarItem onClick={EditActions.cut}>Cut <MenubarShortcut>Ctrl+X</MenubarShortcut></MenubarItem>
                              <MenubarItem onClick={EditActions.copy}>Copy <MenubarShortcut>Ctrl+C</MenubarShortcut></MenubarItem>
                              <MenubarItem onClick={EditActions.paste}>Paste <MenubarShortcut>Ctrl+V</MenubarShortcut></MenubarItem>
                              <MenubarItem onClick={EditActions.selectAll}>Select All <MenubarShortcut>Ctrl+A</MenubarShortcut></MenubarItem>
                         </MenubarGroup>
                    </MenubarContent>
               </MenubarMenu>
               <ViewMenu/>
               <MenubarMenu>
                    <MenubarTrigger className="tracking-tight">Tools</MenubarTrigger>
                    <MenubarContent>
                         <MenubarSub>
                              <MenubarSubTrigger>Translate using</MenubarSubTrigger>
                              <MenubarSubContent>
                                   {Object.entries(PROVIDER_NAMES).map(([provider,name])=>(
                                        <AutoTranslatePopup
                                             key={provider}
                                             provider={provider as AutoTranslateProvider}
                                             triggerButton={<MenubarItem onSelect={(e) => e.preventDefault()}>{name}</MenubarItem>}
                                        />
                                   ))}
                              </MenubarSubContent>
                         </MenubarSub>
                         <MenubarSub>
                              <MenubarSubTrigger>Validation</MenubarSubTrigger>
                              <MenubarSubContent>
                                   <MenubarItem onClick={validateKeys}>Validate Keys</MenubarItem>
                                   <MenubarItem onClick={removeUnusedKeys}>Remove Unused Keys</MenubarItem>
                                   <SpellCheckPopup triggerButton={(
                                        <MenubarItem onSelect={(e) => e.preventDefault()}>Spell check (using Hunspell)</MenubarItem>
                                   )}/>
                              </MenubarSubContent>
                         </MenubarSub>
                         <TransliterateScriptPopup triggerButton={(
                              <MenubarItem onSelect={(e) => e.preventDefault()}>Transliterate Script</MenubarItem>
                         )}/>
                    </MenubarContent>
               </MenubarMenu>
          </Menubar>
     )
}