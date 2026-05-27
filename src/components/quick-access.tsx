import { Button } from "@/components/ui/button";
import { FilePlus, FolderOpen, Languages, RotateCcw, Save, Search, SearchCheck } from "lucide-react";

export default function QuickAccessToolbar(){
     return (
          <div className="py-2 gap-1 flex items-center justify-center flex-wrap">
               <Button variant="secondary" className="flex-1 aspect-square" title="New Translation">
                    <FilePlus/>
               </Button>
               <Button variant="secondary" className="flex-1 aspect-square" title="Open Translations">
                    <FolderOpen/>
               </Button>
               <Button variant="secondary" className="flex-1 aspect-square" title="Save Translation">
                    <Save/>
               </Button>
               <Button variant="secondary" className="flex-1 aspect-square" title="Find Missing Keys">
                    <Search/>
               </Button>
               <Button variant="secondary" className="flex-1 aspect-square" title="Auto-translate">
                    <Languages/>
               </Button>
               <Button variant="secondary" className="flex-1 aspect-square" title="Validate Keys">
                    <SearchCheck/>
               </Button>
               <Button variant="secondary" className="flex-1 aspect-square" title="Replace Translation">
                    <RotateCcw/>
               </Button>
          </div>
     )
}