import { Button } from "@/components/ui/button";
import FilesystemActions from "@/actions/file-system";
import FindActions from "@/actions/find";
import TranslatorActions from "@/actions/translator";
import { FilePlus, FolderOpen, Languages, RotateCcw, Save, Search, SearchCheck } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function QuickAccessToolbar(){
     return (
          <div className="py-2 gap-1 flex items-center justify-center flex-wrap">
               <Button variant="secondary" className="flex-1 aspect-square" title="New Translation" onClick={FilesystemActions.newTranslation}>
                    <FilePlus/>
               </Button>
               <Button variant="secondary" className="flex-1 aspect-square" title="Open Translation" onClick={FilesystemActions.openTranslation}>
                    <FolderOpen/>
               </Button>
               <Button variant="secondary" className="flex-1 aspect-square" title="Save Translation" onClick={FilesystemActions.saveAll}>
                    <Save/>
               </Button>
               <Button variant="secondary" className="flex-1 aspect-square" title="Find Missing Keys" onClick={FindActions.findMissing}>
                    <Search/>
               </Button>
               <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="secondary" className="flex-1 aspect-square" title="Auto-translate">
                              <Languages/>
                         </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full min-w-48">
                         <DropdownMenuLabel>Translate Using...</DropdownMenuLabel>
                         <DropdownMenuSeparator/>
                         <DropdownMenuItem onClick={()=>TranslatorActions.autoTranslate("google-translate")}>Google Translate</DropdownMenuItem>
                         <DropdownMenuItem onClick={()=>TranslatorActions.autoTranslate("gemini")}>Gemini</DropdownMenuItem>
                         <DropdownMenuItem onClick={()=>TranslatorActions.autoTranslate("libretranslate")}>LibreTranslate</DropdownMenuItem>
                         <DropdownMenuItem onClick={()=>TranslatorActions.autoTranslate("llama-ai")}>Llama AI</DropdownMenuItem>
                    </DropdownMenuContent>
               </DropdownMenu>
               <Button variant="secondary" className="flex-1 aspect-square" title="Validate Keys" onClick={TranslatorActions.validateKeys}>
                    <SearchCheck/>
               </Button>
               <Button variant="secondary" className="flex-1 aspect-square" title="Replace Translation" onClick={FilesystemActions.replaceTranslation}>
                    <RotateCcw/>
               </Button>
          </div>
     )
}