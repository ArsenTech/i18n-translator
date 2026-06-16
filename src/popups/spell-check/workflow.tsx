import AppModal from "@/components/popups/modal";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PopupFormProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

const suggestions = ["Nope", "Node", "Not"];

export default function SpellCheckWorkflowPopup({open, setOpen}: PopupFormProps){
     const [selectedSuggestion, setSelectedSuggestion] = useState("")
     return (
          <AppModal
               size="lg"
               title="Spell Check"
               description="Spell checking using Hunspell"
               open={open}
               onOpenChange={setOpen}
          >
               <p className="text-sm text-muted-foreground">Issue 4 of 127</p>
               <div className="w-full text-base">
                    <pre className="bg-muted p-2.5 border w-full rounded-lg whitespace-pre-wrap">
                         <code className="break-all">[Noope], it's way better</code>
                    </pre>
                    <div className="ml-3 flex flex-col gap-1 border-l pl-2">
                         <span className="text-primary-foreground font-semibold text-base py-1">Noope</span>
                    </div>
               </div>
               <div className="space-y-2">
                    <Label>Suggestions</Label>
                    <ScrollArea className="h-[20dvh] bg-card text-card-foreground border rounded-md p-3">
                         {suggestions.map((suggestion, index) => (
                              <button
                                   key={`${suggestion}-${index+1}`}
                                   className={cn(
                                        "w-full text-left inline-flex items-center gap-2 cursor-pointer",
                                        "border-b pb-2 mb-2 last:border-0 last:pb-0 last:mb-0"
                                   )}
                                   onClick={()=>setSelectedSuggestion(suggestion)}
                              >
                                   {selectedSuggestion===suggestion && (
                                        <CheckCircle className="size-5 text-emerald-600 dark:text-emerald-400"/>
                                   )}
                                   {suggestion}
                              </button>
                         ))}
                    </ScrollArea>
               </div>
               <div className="grid grid-cols-2 gap-1">
                    <Button className="flex-1">Replace once</Button>
                    <Button className="flex-1">Replace All</Button>
                    <Button variant="secondary">Skip</Button>
                    <Button variant="secondary">Skip All</Button>
                    <Button className="col-span-2" variant="secondary">Add to the dictionary</Button>
               </div>
               <DialogFooter>
                    <Button>Skip All Remaining</Button>
               </DialogFooter>
          </AppModal>
     )
}