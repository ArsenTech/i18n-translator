import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "../ui/menubar";
import { exit } from '@tauri-apps/plugin-process';
import FilesystemActions from "@/lib/actions/file-system";
import FindActions from "@/lib/actions/find";
import TranslatorActions from "@/lib/actions/translator";
import { useTreeSidebar } from "@/context/sidebar";
import { ViewActions } from "@/lib/actions/view";

export default function MenuBar(){
     const {setOpen, isMobile} = useTreeSidebar()
     return (
          <Menubar className="h-full border-0 bg-transparent shadow-none rounded-none">
               <MenubarMenu>
                    <MenubarTrigger className="tracking-tight">File</MenubarTrigger>
                    <MenubarContent>
                         <MenubarGroup>
                              <MenubarItem onClick={FilesystemActions.newTranslation}>New Translation</MenubarItem>
                              <MenubarItem onClick={FilesystemActions.openTranslation}>Open Translations</MenubarItem>
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
                                             <MenubarItem onClick={()=>FindActions.find("test")}>Find...<MenubarShortcut>Ctrl+F</MenubarShortcut></MenubarItem>
                                             <MenubarItem onClick={FindActions.findNext}>Find Next</MenubarItem>
                                             <MenubarItem onClick={FindActions.findPrev}>Find Previous</MenubarItem>
                                             <MenubarItem onClick={FindActions.findMissing}>Find Missing Keys</MenubarItem>
                                        </MenubarGroup>
                                   </MenubarSubContent>
                              </MenubarSub>
                              <MenubarItem onClick={FilesystemActions.replaceTranslation}>Replace Translation <MenubarShortcut>Ctrl+R</MenubarShortcut></MenubarItem>
                              <MenubarItem onClick={FilesystemActions.batchRename}>Batch Rename <MenubarShortcut>Ctrl+Shift+R</MenubarShortcut></MenubarItem>
                         </MenubarGroup>
                         <MenubarSeparator/>
                         <MenubarGroup>
                              <MenubarItem onClick={TranslatorActions.goToProp}>Go to prop name</MenubarItem>
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
                         <MenubarItem onClick={TranslatorActions.toggleMissing}>Toggle Missing Only</MenubarItem>
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
                                   <MenubarItem onClick={()=>TranslatorActions.autoTranslate("google-translate")}>Google Translate</MenubarItem>
                                   <MenubarItem onClick={()=>TranslatorActions.autoTranslate("gemini")}>Gemini</MenubarItem>
                                   <MenubarItem onClick={()=>TranslatorActions.autoTranslate("libretranslate")}>LibreTranslate</MenubarItem>
                                   <MenubarItem onClick={()=>TranslatorActions.autoTranslate("llama-ai")}>Llama AI</MenubarItem>
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
                         <MenubarItem onClick={TranslatorActions.transliterateScript}>Transliterate Script</MenubarItem>
                    </MenubarContent>
               </MenubarMenu>
          </Menubar>
     )
}