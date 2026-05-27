import { useIsMobile } from "@/hooks/use-mobile"
import { Skeleton } from "../ui/skeleton";

export default function TreeSidebarLoader(){
     const isMobile = useIsMobile();
     if(isMobile) return (
          <Skeleton className="h-8 w-full"/>
     )
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