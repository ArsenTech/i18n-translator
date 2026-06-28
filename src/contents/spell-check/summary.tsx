import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { BookPlus, CheckCircle, List, NotebookText, SkipForward } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";

export default function SpellCheckSummary(){
     const {t} = useTranslation("spell-checker",{
          keyPrefix: "summary"
     })
     return (
          <>
               <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                         <CheckCircle className="size-4.5 text-muted-foreground"/>
                         {t("corrected",{count: 5})}
                    </li>
                    <li className="flex items-center gap-2">
                         <SkipForward className="size-4.5 text-muted-foreground"/>
                         {t("skipped",{count: 6})}
                    </li>
                    <li className="flex items-center gap-2">
                         <NotebookText className="size-4.5 text-muted-foreground"/>
                         {t("already-correct",{count: 522})}
                    </li>
                    <li className="flex items-center gap-2">
                         <BookPlus className="size-4.5 text-muted-foreground"/>
                         {t("added-dict",{count: 5})}
                    </li>
                    <li className="flex items-center gap-2">
                         <List className="size-4.5 text-muted-foreground"/>
                         {t("total",{count: 5445})}
                    </li>
               </ul>
               <div className="flex items-center gap-2">
                    <Checkbox/>
                    <Label>{t("dont-show")}</Label>
               </div>
               <DialogFooter>
                    <Button>{t("done")}</Button>
               </DialogFooter>
          </>
     )
}