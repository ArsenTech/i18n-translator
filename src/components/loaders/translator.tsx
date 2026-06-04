import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMemo } from "react";

interface Props{
     rows?: number,
}
export function TableLoader({rows=12}: Props){
     const colsArr = [200,400,400,60]
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
export function TranslationInputLoader(){
     return (
          <>
          <div className="flex items-center gap-2">
               <Skeleton className="h-3.5 w-8"/>
               <Skeleton className="h-3 flex-1 rounded-full"/>
          </div>
          <div className="flex gap-2">
               <Skeleton className="flex-2 h-full min-h-0"/>
               <div className="flex items-center gap-1 flex-wrap flex-1">
                    <Skeleton className="flex-1 h-8 min-w-[165px]"/>
                    <Skeleton className="flex-1 h-8 min-w-32"/>
                    <Skeleton className="flex-1 h-8 min-w-[150px]"/>
                    <Skeleton className="flex-1 h-8 min-w-[150px]"/>
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
               {Array.from({length: 8}).map((_,i)=>(
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
export function TreeSidebarLoader(){
     const isMobile = useIsMobile();
     if(isMobile) return null
     return (
          <div className="bg-card text-card-foreground border shadow-xs rounded-md md:flex-1 min-h-0 h-full p-2 space-y-1">
               <Skeleton className="h-7 w-full"/>
               <Skeleton className="h-7 w-full"/>
               <div className="ml-4 flex flex-col gap-1 border-l pl-2">
                    <Skeleton className="h-7 w-full"/>
                    <div className="ml-4 flex flex-col gap-1 border-l pl-2">
                         <Skeleton className="h-7 w-full"/>
                    </div>
               </div>
          </div>
     )
}
export default function MainContentLoader(){
     return (
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] px-4 py-2 gap-4 md:h-[calc(100dvh-40px)] overflow-hidden">
               <div className="w-full flex flex-col gap-1 min-h-0 overflow-hidden">
                    <QuickAccessToolbarLoader/>
                    <TreeSidebarLoader/>
               </div>
               <div className="w-full flex flex-col gap-2 min-h-0 overflow-hidden">
                    <LanguageSelectLoader/>
                    <TableLoader/>
                    <TranslationInputLoader/>
                    <TranslatorStatsLoader/>
               </div>
          </div>
     )
}