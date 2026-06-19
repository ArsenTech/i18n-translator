import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dot } from "lucide-react";

export function GlossarySidebarItemLoader(){
     return (
          <li className="space-y-1.5 first:pt-2 pb-2 border-b border-muted last:pb-0 last:border-b-0 text-center w-full">
               <div className="grid grid-cols-[1fr_16px_1fr] gap-2.5 place-items-center w-full">
                    <Skeleton className="h-5 w-full"/>
                    <Skeleton className="size-5"/>
                    <Skeleton className="h-5 w-full"/>
               </div>
               <div className="grid grid-cols-[1fr_16px_1fr] gap-2 place-items-center">
                    <Skeleton className="h-3 w-3/4"/>
                    <Dot className="size-4 text-muted animate-pulse"/>
                    <Skeleton className="h-3 w-3/4"/>
               </div>
          </li>
     )
}
export function GlossarySidebarLoader(){
     const isMobile = useIsMobile();
     if(isMobile) return null
     return (
          <div className="w-full flex flex-col gap-2 min-h-0 overflow-hidden">
               <Skeleton className="h-7 w-full"/>
               <Skeleton className="h-5 w-1/4"/>
               <ul className="space-y-1.5 flex-1 w-full">
                    {Array.from({length: 5}).map((_,i)=>(
                         <GlossarySidebarItemLoader key={i+1}/>
                    ))}
               </ul>
               <Skeleton className="h-8 w-full"/>
          </div>
     )
}
export function GlossaryInputLoader(){
     return (
          <>
          <div className="flex items-center gap-2">
               <Skeleton className="h-3.5 w-8"/>
               <Skeleton className="h-3 flex-1 rounded-full"/>
          </div>
          <div className="flex gap-2">
               <Skeleton className="flex-2 h-8"/>
               <div className="flex items-center gap-1 justify-center flex-wrap">
                    <Skeleton className="flex-1 size-8"/>
                    <Skeleton className="flex-1 size-8"/>
               </div>
          </div>
          </>
     )
}