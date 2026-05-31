import { Skeleton } from "../ui/skeleton";

export default function LanguageSelectLoader(){
     return (
          <div className="flex items-center gap-2">
               <Skeleton className="h-6 w-[38px]"/>
               <Skeleton className="h-8 flex-1"/>
               <Skeleton className="h-6 w-[15px]"/>
               <Skeleton className="h-8 flex-1"/>
          </div>
     )
}