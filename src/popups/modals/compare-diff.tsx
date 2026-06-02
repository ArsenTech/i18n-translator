import TranslatorActions from "@/actions/translator";
import AppModal from "@/components/popups/modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PopupFormProps } from "@/lib/types";
import { useEffect, useState } from "react";

export default function CompareDifferencePopup({triggerButton}: PopupFormProps){
     const [open, setOpen] = useState(false);
     useEffect(()=>{
          if(!open) return
          TranslatorActions.compareDiff()
     },[open])
     return (
          <AppModal
               size="xl"
               title="Compare difference"
               description="Compare translation changes"
               triggerButton={triggerButton}
               open={open}
               onOpenChange={setOpen}
          >
               <div className="h-[50dvh] overflow-auto rounded-md border bg-card text-card-foreground shadow-xs">
                    <Table className="min-w-[900px] table-fixed">
                         <TableHeader>
                              <TableRow>
                                   <TableHead className="sticky top-0 z-20 bg-card">Key</TableHead>
                                   <TableHead className="sticky top-0 z-20 bg-card">Before</TableHead>
                                   <TableHead className="sticky top-0 z-20 bg-card">After</TableHead>
                              </TableRow>
                         </TableHeader>
                         <TableBody>
                              <TableRow>
                                   <TableCell className="font-mono">menu.sync</TableCell>
                                   <TableCell className="bg-destructive/10">Համաժամեցում</TableCell>
                                   <TableCell className="bg-emerald-500/10 font-semibold">Սինքրոնացում</TableCell>
                              </TableRow>
                              <TableRow>
                                   <TableCell className="font-mono">audio.spectrum</TableCell>
                                   <TableCell className="bg-destructive/10">Սպեկտոգրամ</TableCell>
                                   <TableCell className="bg-emerald-500/10 font-semibold">Սպեկտրոգրամ</TableCell>
                              </TableRow>
                         </TableBody>
                    </Table>
               </div>
          </AppModal>
     )
}