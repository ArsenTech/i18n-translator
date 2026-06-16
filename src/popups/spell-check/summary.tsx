import AppModal from "@/components/popups/modal";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PopupFormProps } from "@/lib/types";
import { BookPlus, CheckCircle, List, NotebookText, SkipForward } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function SpellCheckSummaryPopup({open, setOpen}: PopupFormProps){
     return (
          <AppModal
               size="sm"
               title="Spell Check Summary"
               open={open}
               onOpenChange={setOpen}
          >
               <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                         <CheckCircle className="size-4.5 text-muted-foreground"/>
                         5 Corrected
                    </li>
                    <li className="flex items-center gap-2">
                         <SkipForward className="size-4.5 text-muted-foreground"/>
                         6 Skipped
                    </li>
                    <li className="flex items-center gap-2">
                         <NotebookText className="size-4.5 text-muted-foreground"/>
                         522 Already Correct
                    </li>
                    <li className="flex items-center gap-2">
                         <BookPlus className="size-4.5 text-muted-foreground"/>
                         5 Added to Dictionary
                    </li>
                    <li className="flex items-center gap-2">
                         <List className="size-4.5 text-muted-foreground"/>
                         5445 Total Words
                    </li>
               </ul>
               <div className="flex items-center gap-2">
                    <Checkbox/>
                    <Label>Don't show the summary again</Label>
               </div>
               <DialogFooter>
                    <Button>Done</Button>
               </DialogFooter>
          </AppModal>
     )
}