import { Skeleton } from "../ui/skeleton";

export default function TranslationInputLoader(){
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
               </div>
          </div>
          </>
     )
}