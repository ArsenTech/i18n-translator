import { ALL_SHORTCUTS } from "@/lib/constants/items";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useTranslation } from "react-i18next";
import { formatShortcut } from "@/lib/utils";

export default function ShortcutsTable(){
     const {t} = useTranslation("shortcuts")
     return (
          <div className="flex-1 min-h-0 overflow-auto rounded-md border bg-card text-card-foreground shadow-xs">
               <Table className="relative scroll-mt-0">
                    <TableHeader>
                         <TableRow>
                              <TableHead style={{ width: 50 }} className="sticky top-0 z-20 bg-card">
                                   {t("cols.name")}
                              </TableHead>
                              <TableHead style={{ width: 100 }} className="sticky top-0 z-20 bg-card">
                                   {t("cols.shortcut")}
                              </TableHead>
                         </TableRow>
                    </TableHeader>
                    <TableBody>
                         {ALL_SHORTCUTS.map(shortcut=>(
                              <TableRow key={`shortcut-${shortcut}`}>
                                   <TableCell>{t(shortcut)}</TableCell>
                                   <TableCell className="font-mono">{formatShortcut(shortcut)}</TableCell>
                              </TableRow>
                         ))}
                    </TableBody>
               </Table>
          </div>
     )
}