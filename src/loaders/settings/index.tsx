import { Skeleton } from "@/components/ui/skeleton";

export function SettingsLoader(){
     return (
          <>
          <Skeleton className="h-5 w-full max-w-64"/>
          <div className="grid grid-cols-[40px_1fr] gap-4 min-h-0 w-full">
               <Skeleton className="w-10 h-full min-h-[386px]"/>
               <div className="space-y-2">
                    <Skeleton className="w-full h-20"/>
                    <Skeleton className="w-full h-48"/>
                    <Skeleton className="w-full h-20"/>
               </div>
          </div>
          </>
     )
}