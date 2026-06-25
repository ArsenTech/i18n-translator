import { Skeleton } from "@/components/ui/skeleton";
import { ImportExportLoader } from "../fields";

export function SettingsLoader(){
     return (
          <>
          <Skeleton className="h-5 w-full max-w-64"/>
          <div className="flex gap-2 flex-col">
               <Skeleton className="w-full h-8"/>
               <div className="space-y-2 min-h-[50vh] overflow-hidden">
                    <Skeleton className="w-full h-20"/>
                    <Skeleton className="w-full h-48"/>
                    <Skeleton className="w-full h-20"/>
               </div>
          </div>
          <ImportExportLoader/>
          </>
     )
}