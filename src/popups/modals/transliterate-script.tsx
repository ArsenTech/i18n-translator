import AppModal from "@/components/popups/modal";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { TransliterateScriptType } from "@/schemas/types";
import { TransliterateScriptSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import SelectorField from "@/components/fields/selector";
import TranslatorActions from "@/actions/translator";
import { SUPPORTED_SCRIPTS } from "@/lib/constants";
import { PopupFormProps } from "@/lib/types";

export default function TransliterateScriptPopup({triggerButton}: PopupFormProps){
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
          <AppModal
               size="sm"
               title="Transliterate Script"
               description="Transliterate translation scripts"
               triggerButton={triggerButton}
          >
               <form id="transliterate" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="source"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Source script</FieldLabel>
                                        <SelectorField
                                             {...field}
                                             items={[...SUPPORTED_SCRIPTS]}
                                             invalid={fieldState.invalid}
                                             placeholder="Choose a source script"
                                        />
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
                                        <SelectorField
                                             {...field}
                                             items={[...SUPPORTED_SCRIPTS]}
                                             invalid={fieldState.invalid}
                                             placeholder="Choose a Target script"
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
                    <Button type="button" variant="secondary">Find</Button>
                    <Button type="submit" form="transliterate">Transliterate</Button>
               </DialogFooter>
          </AppModal>
     )
}