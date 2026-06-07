import TranslatorActions from "@/actions/translator";
import AppModal from "@/components/popups/modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppTranslation } from "@/context/translation";
import { PopupFormProps } from "@/lib/types";
import { useEffect, useState } from "react";

export default function CompareDifferencePopup({triggerButton}: PopupFormProps){
     const {table} = useAppTranslation()
     const [open, setOpen] = useState(false);
     const [diffTable, setDiffTable] = useState<ReturnType<typeof TranslatorActions.compareDiff>>([])
     useEffect(() => {
          setDiffTable(open ? TranslatorActions.compareDiff(table) : [])
     }, [open, table])
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
                                   <TableHead className="sticky top-0 z-20 bg-card" style={{width: "200px"}}>Key</TableHead>
                                   <TableHead className="sticky top-0 z-20 bg-card">Source</TableHead>
                                   <TableHead className="sticky top-0 z-20 bg-card">Translation</TableHead>
                              </TableRow>
                         </TableHeader>
                         <TableBody>
                              {diffTable.map(item => (
                                   <TableRow key={item.keyName}>
                                        <Tooltip>
                                             <TooltipTrigger asChild>
                                                  <TableCell className="font-mono truncate max-w-[200px]">
                                                       {item.keyName}
                                                  </TableCell>
                                             </TooltipTrigger>
                                             <TooltipContent className="font-mono">{item.keyName}</TooltipContent>
                                        </Tooltip>
                                        <TableCell className="truncate">
                                             {item.source}
                                        </TableCell>
                                        <TableCell className="bg-emerald-500/10 font-semibold truncate">
                                             {item.translation}
                                        </TableCell>
                                   </TableRow>
                              ))}
                              {diffTable.length === 0 && (
                                   <TableRow>
                                        <TableCell
                                             colSpan={3}
                                             className="text-center text-muted-foreground"
                                        >
                                             No differences found.
                                        </TableCell>
                                   </TableRow>
                              )}
                         </TableBody>
                    </Table>
               </div>
          </AppModal>
     )
}