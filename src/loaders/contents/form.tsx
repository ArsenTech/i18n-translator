import { DialogFooter } from "@/components/ui/dialog";
import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { AutoTranslateProvider } from "@/schemas/types";
import { FormFieldLoader } from "../fields";

export function TransliterateScriptLoader(){
     return (
          <>
          <FieldGroup>
               <FormFieldLoader/>
               <FormFieldLoader/>
          </FieldGroup>
          <DialogFooter>
               <Skeleton className="h-8 w-20" />
               <Skeleton className="h-8 w-32" />
          </DialogFooter>
          </>
     )
}
export function AddToGlossaryLoader(){
     return (
          <>
          <FieldGroup>
               <FormFieldLoader/>
               <FormFieldLoader type="switch"/>
               <FormFieldLoader/>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <FormFieldLoader/>
                    <FormFieldLoader/>
               </div>
          </FieldGroup>
          <DialogFooter>
               <Skeleton className="h-8 w-48"/>
          </DialogFooter>
          </>
     )
}
export function BatchRenameKeysLoader(){
     return (
          <>
          <FieldGroup>
               <FormFieldLoader/>
               <FormFieldLoader/>
          </FieldGroup>
          <DialogFooter>
               <Skeleton className="h-8 w-32"/>
          </DialogFooter>
          </>
     )
}
export function FindLoader(){
     return (
          <>
               <FieldGroup>
                    <FormFieldLoader/>
                    <FormFieldLoader type="radio"/>
                    <FormFieldLoader type="switch"/>
               </FieldGroup>
               <DialogFooter>
                    <Skeleton className="h-8 w-20" />
               </DialogFooter>
          </>
     )
}
export function NewTranslationLoader(){
     return (
          <>
          <FieldGroup>
               <FormFieldLoader/>
               <FormFieldLoader includeDescription/>
               <FormFieldLoader/>
          </FieldGroup>
          <DialogFooter>
               <Skeleton className="h-8 w-48"/>
          </DialogFooter>
          </>
     )
}
export function OpenTranslationLoader(){
     return (
          <>
               <FieldGroup>
                    <Skeleton className="h-6 w-full max-w-32"/>
                    <FieldGroup>
                         <FormFieldLoader/>
                         <FormFieldLoader/>
                    </FieldGroup>
                    <FieldSeparator/>
                    <Skeleton className="h-6 w-full max-w-32"/>
                    <FieldGroup>
                         <FormFieldLoader/>
                         <FormFieldLoader/>
                    </FieldGroup>
               </FieldGroup>
               <DialogFooter>
                    <Skeleton className="h-8 w-48"/>
               </DialogFooter>
          </>
     )
}
export function OpenXliffLoader(){
     return (
          <>
               <FieldGroup>
                    <FormFieldLoader/>
                    <FormFieldLoader/>
                    <FormFieldLoader/>
               </FieldGroup>
               <DialogFooter>
                    <Skeleton className="h-8 w-56"/>
               </DialogFooter>
          </>
     )
}
export function ReplaceTranslationLoader(){
     return (
          <>
               <FieldGroup>
                    <FormFieldLoader/>
                    <FormFieldLoader type="switch"/>
                    <FormFieldLoader/>
               </FieldGroup>
               <DialogFooter>
                    <Skeleton className="h-8 w-24"/>
               </DialogFooter>
          </>
     )
}
interface AutoTranslateLoaderProps{
     provider: AutoTranslateProvider
}
export function AutoTranslateLoader({provider}: AutoTranslateLoaderProps){
     return (
          <>
               <FieldGroup>
                    {provider==="gemini" && (
                         <FormFieldLoader/>
                    )}
                    {(provider==="llama-ai" || provider==="libretranslate") && (
                         <>
                         <FormFieldLoader/>
                         <FormFieldLoader/>
                         </>
                    )}
                    <FormFieldLoader type="radio"/>
               </FieldGroup>
               <DialogFooter>
                    <Skeleton className="h-8 w-48"/>
               </DialogFooter>
          </>
     )
}