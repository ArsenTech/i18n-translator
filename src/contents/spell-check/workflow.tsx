import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const suggestions = ["Nope", "Node", "Not"];

export default function SpellCheckWorkflow(){
     const {t} = useTranslation("spell-checker",{
          keyPrefix: "workflow"
     })
     const [selectedSuggestion, setSelectedSuggestion] = useState("")
     return (
          <>
               <p className="text-sm text-muted-foreground">{t("issue",{
                    count: 4,
                    total: 127
               })}</p>
               <div className="w-full text-base">
                    <pre className="bg-muted p-2.5 border w-full rounded-lg whitespace-pre-wrap">
                         <code className="break-all">[Noope], it's way better</code>
                    </pre>
                    <div className="ml-3 flex flex-col gap-1 border-l pl-2">
                         <span className="text-primary-foreground font-semibold text-base py-1">Noope</span>
                    </div>
               </div>
               <div className="space-y-2">
                    <Label>{t("suggestions")}</Label>
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
                    <Button className="w-full">{t("replace-once")}</Button>
                    <Button className="w-full">{t("replace-all")}</Button>
                    <Button variant="secondary">{t("skip")}</Button>
                    <Button variant="secondary">{t("skip-all")}</Button>
                    <Button className="col-span-2" variant="secondary">{t("add-to-dict")}</Button>
               </div>
               <DialogFooter>
                    <Button>{t("skip-all-remaining")}</Button>
               </DialogFooter>
          </>
     )
}