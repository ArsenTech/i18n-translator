import { SHORTCUTS_INFO } from "@/lib/constants/kbd-shortcuts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function ShortcutsTable(){
     return (
          <div className="flex-1 min-h-0 overflow-auto rounded-md border bg-card text-card-foreground shadow-xs">
               <Table className="relative scroll-mt-0">
                    <TableHeader>
                         <TableRow>
                              <TableHead style={{ width: 50 }} className="sticky top-0 z-20 bg-card">
                                   Name
                              </TableHead>
                              <TableHead style={{ width: 100 }} className="sticky top-0 z-20 bg-card">
                                   Shortcut
                              </TableHead>
                         </TableRow>
                    </TableHeader>
                    <TableBody>
                         {SHORTCUTS_INFO.map((shortcut,i)=>(
                              <TableRow key={`shortcut-${i+1}`}>
                                   <TableCell>{shortcut.name}</TableCell>
                                   <TableCell className="font-mono">{shortcut.shortcut}</TableCell>
                              </TableRow>
                         ))}
                    </TableBody>
               </Table>
          </div>
     )
}