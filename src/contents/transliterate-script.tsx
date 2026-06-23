import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { TransliterateScriptType } from "@/schemas/types";
import { TransliterateScriptSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import TranslatorActions from "@/actions/translator";
import { SUPPORTED_SCRIPTS } from "@/lib/constants/items";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SelectorField = lazy(()=>import("@/components/fields/selector"))

export default function TransliterateScript(){
     const form = useForm<TransliterateScriptType>({
          resolver: zodResolver(TransliterateScriptSchema),
          defaultValues: {
               source: "latin",
               target: "cyrillic"
          }
     })
     const onSubmit = (values: TransliterateScriptType) => {
          TranslatorActions.transliterateScript(values)
     }
     return (
          <>
               <form id="transliterate" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="source"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Source script</FieldLabel>
                                        <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                             <SelectorField
                                                  {...field}
                                                  items={[...SUPPORTED_SCRIPTS]}
                                                  invalid={fieldState.invalid}
                                                  placeholder="Choose a source script"
                                             />
                                        </Suspense>
                                        {fieldState.invalid && (
                                             <FieldError errors={[fieldState.error]} />
                                        )}
                                   </Field>
                              )}
                         />
                         <Controller
                              control={form.control}
                              name="target"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Target script</FieldLabel>
                                        <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                             <SelectorField
                                                  {...field}
                                                  items={[...SUPPORTED_SCRIPTS]}
                                                  invalid={fieldState.invalid}
                                                  placeholder="Choose a Target script"
                                             />
                                        </Suspense>
                                        {fieldState.invalid && (
                                             <FieldError errors={[fieldState.error]} />
                                        )}
                                   </Field>
                              )}
                         />
                    </FieldGroup>
               </form>
               <DialogFooter>
                    <Button type="button" variant="secondary">Find</Button>
                    <Button type="submit" form="transliterate">Transliterate</Button>
               </DialogFooter>
          </>
     )
}