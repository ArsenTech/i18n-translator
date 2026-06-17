import AppModal from "@/components/popups/modal";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { SpellCheckType } from "@/schemas/types";
import { SpellCheckSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import { PopupComponentProps } from "@/lib/types";
import SelectorField from "@/components/fields/selector";
import { DEFAULT_DICTIONARIES, RESOURCE_TYPE } from "@/lib/constants";
import RadioField from "@/components/fields/radio-field";
import TranslatorActions from "@/actions/translator";

export default function SpellCheckPopup({triggerButton}: PopupComponentProps){
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
          <AppModal
               size="sm"
               title="Spell Check"
               description="Spell checking using Hunspell"
               triggerButton={triggerButton}
          >
               <form id="spell-check" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="dictionary"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>From</FieldLabel>
                                        <SelectorField
                                             {...field}
                                             items={DEFAULT_DICTIONARIES}
                                             invalid={fieldState.invalid}
                                             placeholder="English"
                                        />
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
                    <Button type="submit" form="spell-check">Check Spelling</Button>
               </DialogFooter>
          </AppModal>
     )
}