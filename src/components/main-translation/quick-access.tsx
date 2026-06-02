import { Button } from "@/components/ui/button";
import FilesystemActions from "@/actions/file-system";
import FindActions from "@/actions/find";
import TranslatorActions from "@/actions/translator";
import { FilePlus, FolderOpen, Languages, RotateCcw, Save, Search, SearchCheck, SpellCheckIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import NewTranslationPopup from "@/popups/modals/new-translation";
import OpenTranslationPopup from "@/popups/modals/open-translation";
import { PROVIDER_NAMES } from "@/lib/constants";
import AutoTranslatePopup from "@/popups/modals/auto-translate";
import { AutoTranslateProvider } from "@/schemas/types";
import ReplaceTranslationPopup from "@/popups/modals/replace-translation";
import SpellCheckPopup from "@/popups/modals/spell-check";

export default function QuickAccessToolbar(){
     return (
          <div className="py-2 gap-1 flex items-center justify-center flex-wrap">
               <NewTranslationPopup triggerButton={(
                    <Button variant="secondary" className="flex-1 aspect-square" title="New Translation">
                         <FilePlus/>
                    </Button>
               )}/>
               <OpenTranslationPopup triggerButton={(
                    <Button variant="secondary" className="flex-1 aspect-square" title="Open Translation">
                         <FolderOpen/>
                    </Button>
               )}/>
               <Button variant="secondary" className="flex-1 aspect-square" title="Save Translation" onClick={FilesystemActions.saveAll}>
                    <Save/>
               </Button>
               <Button variant="secondary" className="flex-1 aspect-square" title="Find Missing Keys" onClick={FindActions.findMissing}>
                    <Search/>
               </Button>
               <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                         <Button variant="secondary" className="flex-1 aspect-square" title="Auto-translate">
                              <Languages/>
                         </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full min-w-48">
                         <DropdownMenuLabel>Translate Using...</DropdownMenuLabel>
                         <DropdownMenuSeparator/>
                         {Object.entries(PROVIDER_NAMES).map(([provider,name])=>(
                              <AutoTranslatePopup
                                   key={provider}
                                   provider={provider as AutoTranslateProvider}
                                   triggerButton={<DropdownMenuItem onSelect={e=>e.preventDefault()}>{name}</DropdownMenuItem>}
                              />
                         ))}
                    </DropdownMenuContent>
               </DropdownMenu>
               <Button variant="secondary" className="flex-1 aspect-square" title="Validate Keys" onClick={TranslatorActions.validateKeys}>
                    <SearchCheck/>
               </Button>
               <ReplaceTranslationPopup triggerButton={(
                    <Button variant="secondary" className="flex-1 aspect-square" title="Replace Translation">
                         <RotateCcw/>
                    </Button>
               )}/>
               <SpellCheckPopup triggerButton={(
                    <Button variant="secondary" className="flex-1 aspect-square" title="Spell Check">
                         <SpellCheckIcon/>
                    </Button>
               )}/>
          </div>
     )
}