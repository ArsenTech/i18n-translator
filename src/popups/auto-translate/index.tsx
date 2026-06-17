import AppModal from "@/components/popups/modal";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { AutoTranslateProvider, AutoTranslateType } from "@/schemas/types";
import { AutoTranslateSchema } from "@/schemas/auto-translate";
import { DialogFooter } from "@/components/ui/dialog";
import TranslatorActions from "@/actions/translator";
import RadioField from "@/components/fields/radio-field";
import { GeminiFields, LibreTranslateFields, LlamaAIFields } from "./fields";
import { PROVIDER_NAMES, RESOURCE_TYPE } from "@/lib/constants";
import { PopupComponentProps } from "@/lib/types";

interface AutoTranslatePopupProps extends PopupComponentProps{
     provider: AutoTranslateProvider
}
export default function AutoTranslatePopup({provider, triggerButton}: AutoTranslatePopupProps){
     const form = useForm<AutoTranslateType>({
          resolver: zodResolver(AutoTranslateSchema),
          defaultValues: {
               provider,
               target: "key",
               apiKey: "",
               serverURL: "",
               endpoint: "",
               model: ""
          }
     })
     const onSubmit = (values: AutoTranslateType) => {
          TranslatorActions.autoTranslate(values)
     }
     return (
          <AppModal
               title="Auto-Translate"
               description={`Auto-Translation using ${PROVIDER_NAMES[provider]}`}
               triggerButton={triggerButton}
          >
               <form id="auto-translate" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         {provider==="gemini" && (
                              <GeminiFields control={form.control}/>
                         )}
                         {provider==="libretranslate" && (
                              <LibreTranslateFields control={form.control}/>
                         )}
                         {provider==="llama-ai" && (
                              <LlamaAIFields control={form.control}/>
                         )}
                         <Controller
                              control={form.control}
                              name="target"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Target</FieldLabel>
                                        <RadioField
                                             {...field}
                                             invalid={fieldState.invalid}
                                             items={RESOURCE_TYPE}
                                        />
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
          </AppModal>
     )
}