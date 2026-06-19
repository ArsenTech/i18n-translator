import { DialogFooter } from "@/components/ui/dialog";
import { LanguageSelectLoader, TableLoader, GlossaryInputLoader } from "../translator";
import { Skeleton } from "@/components/ui/skeleton";

export default function GlossaryManagerLoader(){
     return (
          <>
               <LanguageSelectLoader/>
               <TableLoader rows={8} cols={[200,200,32,50,50]}/>
               <GlossaryInputLoader/>
               <DialogFooter>
                    <Skeleton className="h-8 w-48"/>
               </DialogFooter>
          </>
     )
}