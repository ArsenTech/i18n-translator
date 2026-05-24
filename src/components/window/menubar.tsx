import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "../ui/menubar";
import { exit } from '@tauri-apps/plugin-process';

// TODO: make each item alongside the logo dropdown working once the mockup is finished

export default function MenuBar(){
     return (
          <Menubar className="h-full border-0 bg-transparent shadow-none rounded-none">
               <MenubarMenu>
                    <MenubarTrigger className="tracking-tight">File</MenubarTrigger>
                    <MenubarContent>
                         <MenubarGroup>
                              <MenubarItem>New Translation</MenubarItem>
                              <MenubarItem>Open Translations</MenubarItem>
                              <MenubarItem>Recent Translations</MenubarItem>
                         </MenubarGroup>
                         <MenubarSeparator/>
                         <MenubarGroup>
                              <MenubarItem>Save <MenubarShortcut>Ctrl+S</MenubarShortcut></MenubarItem>
                              <MenubarItem>Save As... <MenubarShortcut>Ctrl+Shift+S</MenubarShortcut></MenubarItem>
                         </MenubarGroup>
                         <MenubarSeparator/>
                         <MenubarItem onClick={()=>exit(0)}>
                              Exit
                              <MenubarShortcut>Alt+F4</MenubarShortcut>
                         </MenubarItem>
                    </MenubarContent>
               </MenubarMenu>
               <MenubarMenu>
                    <MenubarTrigger className="tracking-tight">Edit</MenubarTrigger>
                    <MenubarContent>
                         <MenubarGroup>
                              <MenubarItem>
                                   Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut>
                              </MenubarItem>
                              <MenubarItem>
                                   Redo <MenubarShortcut>Ctrl+Y</MenubarShortcut>
                              </MenubarItem>
                         </MenubarGroup>
                         <MenubarSeparator />
                         <MenubarGroup>
                              <MenubarSub>
                                   <MenubarSubTrigger>Find</MenubarSubTrigger>
                                   <MenubarSubContent>
                                        <MenubarGroup>
                                             <MenubarItem>Find...<MenubarShortcut>Ctrl+F</MenubarShortcut></MenubarItem>
                                             <MenubarItem>Find Next</MenubarItem>
                                             <MenubarItem>Find Previous</MenubarItem>
                                             <MenubarItem>Find Missing Keys</MenubarItem>
                                        </MenubarGroup>
                                   </MenubarSubContent>
                              </MenubarSub>
                              <MenubarItem>Replace Translation <MenubarShortcut>Ctrl+R</MenubarShortcut></MenubarItem>
                              <MenubarItem>Batch Rename <MenubarShortcut>Ctrl+Shift+R</MenubarShortcut></MenubarItem>
                         </MenubarGroup>
                         <MenubarSeparator/>
                         <MenubarGroup>
                              <MenubarItem>Go to prop name</MenubarItem>
                              <MenubarItem>Select untranslated</MenubarItem>
                              <MenubarItem>Compare diff</MenubarItem>
                         </MenubarGroup>
                         <MenubarSeparator />
                         <MenubarGroup>
                              <MenubarItem>Cut <MenubarShortcut>Ctrl+X</MenubarShortcut></MenubarItem>
                              <MenubarItem>Copy <MenubarShortcut>Ctrl+C</MenubarShortcut></MenubarItem>
                              <MenubarItem>Paste <MenubarShortcut>Ctrl+V</MenubarShortcut></MenubarItem>
                              <MenubarItem>Select All <MenubarShortcut>Ctrl+A</MenubarShortcut></MenubarItem>
                         </MenubarGroup>
                    </MenubarContent>
               </MenubarMenu>
               <MenubarMenu>
                    <MenubarTrigger className="tracking-tight">View</MenubarTrigger>
                    <MenubarContent>
                         <MenubarItem>Toggle Sidebar</MenubarItem>
                         <MenubarItem>Toggle Missing Only</MenubarItem>
                         <MenubarItem>Zoom</MenubarItem>
                    </MenubarContent>
               </MenubarMenu>
               <MenubarMenu>
                    <MenubarTrigger className="tracking-tight">Tools</MenubarTrigger>
                    <MenubarContent>
                         <MenubarSub>
                              <MenubarSubTrigger>Translate using</MenubarSubTrigger>
                              <MenubarSubContent>
                                   <MenubarItem>Google Translate</MenubarItem>
                                   <MenubarItem>Gemini</MenubarItem>
                                   <MenubarItem>LibreTranslate</MenubarItem>
                                   <MenubarItem>Llama AI</MenubarItem>
                              </MenubarSubContent>
                         </MenubarSub>
                         <MenubarSub>
                              <MenubarSubTrigger>Validation</MenubarSubTrigger>
                              <MenubarSubContent>
                                   <MenubarItem>Validate Keys</MenubarItem>
                                   <MenubarItem>Remove Unused Keys</MenubarItem>
                                   <MenubarItem>Spell check (using Hunspell)</MenubarItem>
                              </MenubarSubContent>
                         </MenubarSub>
                         <MenubarItem>Transliterate Script</MenubarItem>
                    </MenubarContent>
               </MenubarMenu>
          </Menubar>
     )
}