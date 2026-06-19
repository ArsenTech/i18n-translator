import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

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
export function TreeNodeLoader(){
     return (
          <div className="space-y-1">
               <Skeleton className="h-7 w-full" />
               <div className="ml-4 border-l pl-2 space-y-1">
                    <Skeleton className="h-7 w-5/6" />
                    <Skeleton className="h-7 w-4/6" />
                    <div className="ml-4 border-l pl-2">
                         <Skeleton className="h-7 w-3/6" />
                    </div>
               </div>
          </div>
     )
}