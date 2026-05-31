import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "../ui/menubar";
import { exit } from '@tauri-apps/plugin-process';
import FilesystemActions from "@/actions/file-system";
import FindActions from "@/actions/find";
import TranslatorActions from "@/actions/translator";
import { useTreeSidebar } from "@/context/sidebar";
import ViewActions from "@/actions/view";
import { useAppTranslation } from "@/context/translation";
import NewTranslationPopup from "@/popups/modals/new-translation";
import OpenTranslationPopup from "@/popups/modals/open-translation";
import FindPopup from "@/popups/modals/find";
import ReplaceTranslationPopup from "@/popups/modals/replace-translation";
import GoToKeyNamePopup from "@/popups/modals/go-to-key";
import BatchRenameKeysPopup from "@/popups/modals/batch-rename-keys";
import AutoTranslatePopup from "@/popups/modals/auto-translate";
import TransliterateScriptPopup from "@/popups/modals/transliterate-script";
import { PROVIDER_NAMES } from "@/lib/constants";
import { AutoTranslateProvider } from "@/schemas/types";

export default function MenuBar(){
     const {setOpen, isMobile} = useTreeSidebar()
     const {setMissingOnly} = useAppTranslation()
     return (
          <Menubar className="h-full border-0 bg-transparent shadow-none rounded-none">
               <MenubarMenu>
                    <MenubarTrigger className="tracking-tight">File</MenubarTrigger>
                    <MenubarContent>
                         <MenubarGroup>
                              <NewTranslationPopup triggerButton={(
                                   <MenubarItem onSelect={(e) => e.preventDefault()}>New Translation</MenubarItem>
                              )}/>
                              <OpenTranslationPopup triggerButton={(
                                   <MenubarItem onSelect={(e) => e.preventDefault()}>Open Translations</MenubarItem>
                              )}/>
                              <MenubarItem onClick={FilesystemActions.openRecent}>Recent Translations</MenubarItem>
                         </MenubarGroup>
                         <MenubarSeparator/>
                         <MenubarGroup>
                              <MenubarItem onClick={FilesystemActions.saveAll}>Save <MenubarShortcut>Ctrl+S</MenubarShortcut></MenubarItem>
                              <MenubarItem onClick={FilesystemActions.saveAs}>Save As... <MenubarShortcut>Ctrl+Shift+S</MenubarShortcut></MenubarItem>
                         </MenubarGroup>
                         <MenubarSeparator/>
                         <MenubarItem onClick={()=>exit(0)}>Exit <MenubarShortcut>Alt+F4</MenubarShortcut></MenubarItem>
                    </MenubarContent>
               </MenubarMenu>
               <MenubarMenu>
                    <MenubarTrigger className="tracking-tight">Edit</MenubarTrigger>
                    <MenubarContent>
                         <MenubarGroup>
                              <MenubarItem onClick={FilesystemActions.undo}>Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut></MenubarItem>
                              <MenubarItem onClick={FilesystemActions.redo}>Redo <MenubarShortcut>Ctrl+Y</MenubarShortcut></MenubarItem>
                         </MenubarGroup>
                         <MenubarSeparator />
                         <MenubarGroup>
                              <MenubarSub>
                                   <MenubarSubTrigger>Find</MenubarSubTrigger>
                                   <MenubarSubContent>
                                        <MenubarGroup>
                                             <FindPopup triggerButton={(
                                                  <MenubarItem onSelect={(e) => e.preventDefault()}>
                                                       Find...
                                                       <MenubarShortcut>Ctrl+F</MenubarShortcut>
                                                  </MenubarItem>
                                             )}/>
                                             <MenubarItem onClick={FindActions.findNext}>Find Next</MenubarItem>
                                             <MenubarItem onClick={FindActions.findPrev}>Find Previous</MenubarItem>
                                             <MenubarItem onClick={FindActions.findMissing}>Find Missing Keys</MenubarItem>
                                        </MenubarGroup>
                                   </MenubarSubContent>
                              </MenubarSub>
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
                              <GoToKeyNamePopup triggerButton={(
                                   <MenubarItem onSelect={(e) => e.preventDefault()}>Go to key name</MenubarItem>
                              )}/>
                              <MenubarItem onClick={TranslatorActions.selectUntranslated}>Select untranslated</MenubarItem>
                              <MenubarItem onClick={TranslatorActions.compareDiff}>Compare diff</MenubarItem>
                         </MenubarGroup>
                         <MenubarSeparator />
                         <MenubarGroup>
                              <MenubarItem onClick={FilesystemActions.cut}>Cut <MenubarShortcut>Ctrl+X</MenubarShortcut></MenubarItem>
                              <MenubarItem onClick={FilesystemActions.copy}>Copy <MenubarShortcut>Ctrl+C</MenubarShortcut></MenubarItem>
                              <MenubarItem onClick={FilesystemActions.paste}>Paste <MenubarShortcut>Ctrl+V</MenubarShortcut></MenubarItem>
                              <MenubarItem onClick={FilesystemActions.selectAll}>Select All <MenubarShortcut>Ctrl+A</MenubarShortcut></MenubarItem>
                         </MenubarGroup>
                    </MenubarContent>
               </MenubarMenu>
               <MenubarMenu>
                    <MenubarTrigger className="tracking-tight">View</MenubarTrigger>
                    <MenubarContent>
                         <MenubarItem disabled={!isMobile} onClick={()=>setOpen(prev=>!prev)}>Toggle Sidebar</MenubarItem>
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
                                   <MenubarItem onClick={TranslatorActions.validateKeys}>Validate Keys</MenubarItem>
                                   <MenubarItem onClick={TranslatorActions.removeUnusedKeys}>Remove Unused Keys</MenubarItem>
                                   <MenubarItem onClick={TranslatorActions.hunspellCheck}>Spell check (using Hunspell)</MenubarItem>
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