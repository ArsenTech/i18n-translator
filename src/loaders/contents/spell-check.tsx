import { DialogFooter } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { FormFieldLoader } from "../fields";

export function SpellCheckerLoader(){
     return (
          <>
               <FieldGroup>
                    <FormFieldLoader/>
                    <FormFieldLoader type="radio"/>
               </FieldGroup>
               <DialogFooter>
                    <Skeleton className="h-8 w-32"/>
               </DialogFooter>
          </>
     )
}
export function SpellCheckSummaryLoader(){
     return (
          <>
               <ul className="space-y-2">
                    {Array.from({length: 5}).map((_,i)=>(
                         <li key={i+1} className="flex items-center gap-2">
                              <Skeleton className="size-4.5"/>
                              <Skeleton className="h-4 w-full max-w-48"/>
                         </li>
                    ))}
               </ul>
               <FormFieldLoader type="checkbox"/>
               <DialogFooter>
                    <Skeleton className="h-8 w-20" />
               </DialogFooter>
          </>
     )
}
export function SpellCheckWorkflowLoader(){
     return (
          <>
               <Skeleton className="h-4 w-full max-w-32"/>
               <div className="w-full text-base">
                    <Skeleton className="rounded-lg w-full min-h-12"/>
                    <div className="ml-3 flex flex-col gap-1 border-l pl-2">
                         <Skeleton className="h-5 w-full max-w-20 mt-2"/>
                    </div>
               </div>
               <Skeleton className="w-full h-[20dvh]"/>
               <div className="grid grid-cols-2 gap-1">
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full col-span-2"/>
               </div>
               <DialogFooter>
                    <Skeleton className="h-8 w-48"/>
               </DialogFooter>
          </>
     )
}