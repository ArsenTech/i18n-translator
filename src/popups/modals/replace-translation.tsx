import AppModal from "@/components/popups/modal";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { ReplaceTranslationType } from "@/schemas/types";
import { ReplaceTranslationSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { PopupFormProps } from "@/lib/types";
import TranslatorActions from "@/actions/translator";

export default function ReplaceTranslationPopup({triggerButton}: PopupFormProps){
     const form = useForm<ReplaceTranslationType>({
          resolver: zodResolver(ReplaceTranslationSchema),
          defaultValues: {
               from: "",
               to: "",
               caseSensitive: false
          }
     })
     const onSubmit = (values: ReplaceTranslationType) => {
          TranslatorActions.replaceTranslation(values)
     }
     return (
          <AppModal
               size="sm"
               title="Replace the translation"
               description="Replace existing translations"
               triggerButton={triggerButton}
          >
               <form id="replace" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="from"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>From</FieldLabel>
                                        <Input
                                             {...field}
                                             id={field.name}
                                             aria-invalid={fieldState.invalid}
                                             placeholder="Cancel"
                                        />
                                        {fieldState.invalid && (
                                             <FieldError errors={[fieldState.error]} />
                                        )}
                                   </Field>
                              )}
                         />
                         <Controller
                              control={form.control}
                              name="to"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>To</FieldLabel>
                                        <Input
                                             {...field}
                                             id={field.name}
                                             aria-invalid={fieldState.invalid}
                                             placeholder="Չեղարկել"
                                        />
                                        {fieldState.invalid && (
                                             <FieldError errors={[fieldState.error]} />
                                        )}
                                   </Field>
                              )}
                         />
                         <Controller
                              control={form.control}
                              name="caseSensitive"
                              render={({field, fieldState})=>(
                                   <Field
                                        orientation="horizontal"
                                        data-invalid={fieldState.invalid}
                                   >
                                        <FieldContent>
                                             <FieldLabel htmlFor={field.name}>
                                                  Case Sensitive
                                             </FieldLabel>
                                             {fieldState.invalid && (
                                                  <FieldError errors={[fieldState.error]} />
                                             )}
                                        </FieldContent>
                                        <Switch
                                             id={field.name}
                                             name={field.name}
                                             checked={field.value}
                                             onCheckedChange={field.onChange}
                                             aria-invalid={fieldState.invalid}
                                        />
                                   </Field>
                              )}
                         />
                    </FieldGroup>
               </form>
               <DialogFooter>
                    <Button type="submit" form="replace">Replace</Button>
               </DialogFooter>
          </AppModal>
     )
}