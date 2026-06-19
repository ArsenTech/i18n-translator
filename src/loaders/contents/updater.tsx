import { DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function UpdaterLoader(){
     return (
          <>
               <Skeleton className="h-5 md:h-6 lg:h-[30px] w-full"/>
               <Skeleton className="rounded-md h-4 w-1/2"/>
               <DialogFooter>
                    <Skeleton className="h-8 w-48"/>
               </DialogFooter>
          </>
     )
}