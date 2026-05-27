import { Skeleton } from "../ui/skeleton"

export default function TranslatorStatsLoader(){
     return (
          <div className="flex items-center gap-2">
               <Skeleton className="h-[38px] w-[125px]"/>
               <Skeleton className="h-[38px] w-[114px]"/>
               <Skeleton className="h-[38px] w-[191px]"/>
               <Skeleton className="h-[38px] w-[77px]"/>
          </div>
     )
}