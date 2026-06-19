import { Field } from "@/components/ui/field"
import { Skeleton } from "@/components/ui/skeleton"

interface RadioFieldLoaderProps{
     length: number
}
export function RadioFieldLoader({length}: RadioFieldLoaderProps){
     return (
          <div className="grid w-full gap-2">
               {Array.from({length}).map((_,i) => (
                    <div key={i+1} className="flex items-center gap-3">
                         <Skeleton className="size-4 rounded-full"/>
                         <Skeleton className="h-4 w-3/4"/>
                    </div>
               ))}
          </div>
     )
}
interface FormFieldLoaderProps{
     type?: "input" | "switch" | "radio" | "checkbox",
     length?: number,
     includeDescription?: boolean
}
export function FormFieldLoader({type="input", length=3, includeDescription=false}: FormFieldLoaderProps){
     if(type==="switch") return (
          <Field orientation="horizontal" className="justify-between">
               <Skeleton className="h-5 w-full max-w-32"/>
               <Skeleton className="h-[18px] w-8 rounded-full"/>
          </Field>
     )
     if(type==="checkbox") return (
          <div className="flex items-center gap-2 w-full">
               <Skeleton className="size-5 rounded-[4px]"/>
               <Skeleton className="h-5 w-full max-w-32"/>
          </div>
     )
     return (
          <Field>
               <Skeleton className="h-5 w-full max-w-24"/>
               {type==="radio" ? (
                    <RadioFieldLoader length={length}/>
               ) : (
                    <Skeleton className="h-8 w-full"/>
               )}
               {includeDescription && (
                    <div className="space-y-1">
                         <Skeleton className="h-3.5 w-full"/>
                         <Skeleton className="h-3.5 w-full max-w-3/4"/>
                    </div>
               )}
          </Field>
     )
}