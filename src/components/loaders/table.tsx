import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMemo } from "react";

interface Props{
     rows?: number,
}
export default function TableLoader({rows=12}: Props){
     const colsArr = [250,300,300,60]
     const rowsArr = useMemo(()=>Array.from({length: rows}).map((_,i)=>i),[rows]);
     return (
          <>
          <div className="flex items-center gap-2">
               <Skeleton className="h-8 flex-1"/>
               <Skeleton className="h-8 w-27"/>
          </div>
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden rounded-md border bg-card text-card-foreground shadow-xs">
               <Table className="min-w-[900px] table-fixed">
                    <TableHeader>
                         <TableRow>
                              {colsArr.map((size,col)=>(
                                   <TableHead key={`col-${col+1}`} style={{width: size}}>
                                        <Skeleton className="h-4 w-full" aria-label={`col-${col+1}`}/>
                                   </TableHead>
                              ))}
                         </TableRow>
                    </TableHeader>
                    <TableBody>
                         {rowsArr.map(row=>(
                              <TableRow key={`row-${row+1}`}>
                                   {colsArr.map((_,col)=>(
                                        <TableCell key={`cell-${row+1}-${col+1}`}>
                                             <Skeleton className="h-4 w-full" aria-label={`cell-${row+1}-${col+1}`}/>
                                        </TableCell>
                                   ))}
                              </TableRow>
                         ))}
                    </TableBody>
               </Table>
          </div>
          </>
     )
}