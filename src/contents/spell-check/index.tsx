import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { SpellCheckType } from "@/schemas/types";
import { SpellCheckSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import { DEFAULT_DICTIONARIES, RESOURCE_TYPE } from "@/lib/constants/items";
import TranslatorActions from "@/actions/translator";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioFieldLoader } from "@/loaders/fields";

const SelectorField = lazy(()=>import("@/components/fields/selector"))
const RadioField = lazy(()=>import("@/components/fields/radio-field"))

export default function SpellChecker(){
     const form = useForm<SpellCheckType>({
          resolver: zodResolver(SpellCheckSchema),
          defaultValues: {
               dictionary: "",
               scope: "key"
          }
     })
     const onSubmit = (values: SpellCheckType) => {
          TranslatorActions.hunspellCheck(values)
     }
     return (
          <>
               <form id="spell-check" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="dictionary"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>From</FieldLabel>
                                        <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                             <SelectorField
                                                  {...field}
                                                  items={DEFAULT_DICTIONARIES}
                                                  invalid={fieldState.invalid}
                                                  placeholder="English"
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
                              name="scope"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Scope</FieldLabel>
                                        <Suspense fallback={<RadioFieldLoader length={RESOURCE_TYPE.length}/>}>
                                             <RadioField
                                                  {...field}
                                                  invalid={fieldState.invalid}
                                                  items={RESOURCE_TYPE}
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
                    <Button type="submit" form="spell-check">Check Spelling</Button>
               </DialogFooter>
          </>
     )
}