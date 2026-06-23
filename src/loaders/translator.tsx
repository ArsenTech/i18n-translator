import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMemo } from "react";

interface Props{
     rows?: number,
     cols: number[]
}
export function TableLoader({rows=12, cols}: Props){
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
                              {cols.map((size,col)=>(
                                   <TableHead key={`col-${col+1}`} style={{width: size}}>
                                        <Skeleton className="h-4 w-full" aria-label={`col-${col+1}`}/>
                                   </TableHead>
                              ))}
                         </TableRow>
                    </TableHeader>
                    <TableBody>
                         {rowsArr.map(row=>(
                              <TableRow key={`row-${row+1}`}>
                                   {cols.map((_,col)=>(
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
export function TranslationInputLoader(){
     return (
          <>
          <div className="flex items-center gap-2">
               <Skeleton className="h-3.5 w-8"/>
               <Skeleton className="h-3 flex-1 rounded-full"/>
          </div>
          <div className="flex gap-2">
               <Skeleton className="flex-2 h-full min-h-0"/>
               <div className="grid grid-cols-2 gap-1">
                    <Skeleton className="w-full h-8 min-w-[165px] col-span-2"/>
                    <Skeleton className="w-full h-8 min-w-32 col-span-2"/>
                    <Skeleton className="w-full h-8 min-w-[100px] col-span-2 sm:col-span-1"/>
                    <Skeleton className="w-full h-8 min-w-[100px] col-span-2 sm:col-span-1"/>
               </div>
          </div>
          </>
     )
}
export function LanguageSelectLoader(){
     return (
          <div className="flex items-center gap-2">
               <Skeleton className="h-6 w-[38px]"/>
               <Skeleton className="h-8 flex-1"/>
               <Skeleton className="h-6 w-[15px]"/>
               <Skeleton className="h-8 flex-1"/>
          </div>
     )
}
export function QuickAccessToolbarLoader(){
     return (
          <div className="px-4 pt-2 gap-1 flex items-center justify-center flex-wrap">
               {Array.from({length: 10}).map((_,i)=>(
                    <Skeleton className="h-8 flex-1 aspect-square" key={i+1}/>
               ))}
          </div>
     )
}
export function TranslatorStatsLoader(){
     return (
          <div className="flex items-center gap-2">
               <Skeleton className="h-[38px] w-[125px]"/>
               <Skeleton className="h-[38px] w-[114px]"/>
               <Skeleton className="h-[38px] w-[191px]"/>
               <Skeleton className="h-[38px] w-[77px]"/>
          </div>
     )
}
export function AboutDetailsLoader(){
     return (
          <div className="space-y-0.5 w-full">
               <Skeleton className="h-5 md:h-6 lg:h-8 w-full max-w-64"/>
               <Skeleton className="h-4 md:h-5 lg:h-6 w-full max-w-[100px]"/>
               <Skeleton className="h-3 sm:h-4 w-1/3"/>
               <Skeleton className="h-3 sm:h-4 w-full max-w-64"/>
          </div>
     )
}