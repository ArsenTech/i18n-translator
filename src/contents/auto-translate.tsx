import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { AutoTranslateProvider, AutoTranslateType } from "@/schemas/types";
import { AutoTranslateSchema } from "@/schemas/auto-translate";
import { DialogFooter } from "@/components/ui/dialog";
import TranslatorActions from "@/actions/translator";
import { RESOURCE_TYPE } from "@/lib/constants/items";
import type { PopupContentProps } from "@/lib/types/props";
import { lazy, Suspense } from "react";
import { FormFieldLoader, RadioFieldLoader } from "@/loaders/fields";
import { useSettings } from "@/context/settings";

const RadioField = lazy(()=>import("@/components/fields/radio-field"))
const GeminiFields = lazy(()=>import("@/components/fields/auto-translate/gemini"));
const LibreTranslateFields = lazy(()=>import("@/components/fields/auto-translate/libre-translate"));
const LlamaAIFields = lazy(()=>import("@/components/fields/auto-translate/llama"));

interface AutoTranslateProps extends PopupContentProps{
     provider: AutoTranslateProvider
}
export default function AutoTranslate({provider}: AutoTranslateProps){
     const {providers} = useSettings()
     const form = useForm<AutoTranslateType>({
          resolver: zodResolver(AutoTranslateSchema),
          defaultValues: {
               provider,
               target: "key",
               apiKey: provider==="gemini" ? providers.geminiApi : provider==="libretranslate" ? providers.libreTranslateApi : "",
               serverURL: providers.libreTranslateServer ?? "",
               endpoint: providers.llamaEndpoint,
               model: providers.llamaModel
          }
     })
     const onSubmit = (values: AutoTranslateType) => {
          TranslatorActions.autoTranslate(values)
     }
     return (
          <>
               <form id="auto-translate" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         {provider==="gemini" && (
                              <Suspense fallback={<FormFieldLoader/>}>
                                   <GeminiFields control={form.control}/>
                              </Suspense>
                         )}
                         {provider==="libretranslate" && (
                              <Suspense fallback={(
                                   <>
                                   <FormFieldLoader/>
                                   <FormFieldLoader/>
                                   </>
                              )}>
                                   <LibreTranslateFields control={form.control}/>
                              </Suspense>
                         )}
                         {provider==="llama-ai" && (
                              <Suspense fallback={(
                                   <>
                                   <FormFieldLoader/>
                                   <FormFieldLoader/>
                                   </>
                              )}>
                                   <LlamaAIFields control={form.control}/>
                              </Suspense>
                         )}
                         <Controller
                              control={form.control}
                              name="target"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Target</FieldLabel>
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
                    <Button type="submit" form="auto-translate">Auto Translate</Button>
               </DialogFooter>
          </>
     )
}