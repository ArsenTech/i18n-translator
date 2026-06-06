import AppModal from "@/components/popups/modal";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { GoToKeyNameType } from "@/schemas/types";
import { GoToKeyNameSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import TranslatorActions from "@/actions/translator";
import { PopupFormProps } from "@/lib/types";
import { useAppTranslation } from "@/context/translation";
import { useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import ComboboxField from "@/components/fields/combobox-field";
import { Search } from "lucide-react";

export default function GoToKeyNamePopup({triggerButton}: PopupFormProps){
     const {table, keyNames, setCurrentTranslation, setVisibleCount, setInput} = useAppTranslation()
     const [open, setOpen] = useState(false)
     const form = useForm<GoToKeyNameType>({
          resolver: zodResolver(GoToKeyNameSchema),
          defaultValues: {
               keyName: ""
          }
     })
     const onSubmit = (values: GoToKeyNameType) => {
          try {
               const res = TranslatorActions.goToKeyName(values,table);
               if(res.error) toast.error("Failed to jump into the specified key name",{
                    description: res.error
               })
               if(res.success) {
                    setCurrentTranslation(res.translation)
                    setInput(res.translation.translationString)
                    setVisibleCount(prev => Math.max(prev, res.index + 1))
                    requestAnimationFrame(() => {
                         document
                              .getElementById(`row-${res.translation.keyName}`)
                              ?.scrollIntoView({
                                   behavior: "smooth",
                                   block: "center",
                              })
                    })
                    setOpen(false);
                    form.reset()
               }
          } catch (err) {
               toast.error("Failed to jump into the specified key name",{
                    description: getErrorMessage(err)
               })
          }
     }
     return (
          <AppModal
               size="sm"
               title="Go to translation key name"
               description="Jump into the provided key name"
               triggerButton={triggerButton}
               open={open} onOpenChange={setOpen}
          >
               <form id="go-to-key" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="keyName"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Translation Key Name</FieldLabel>
                                        <ComboboxField
                                             {...field}
                                             invalid={fieldState.invalid}
                                             placeholder="command.buttons.cancel"
                                             items={keyNames}
                                             Icon={Search}
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
                    <Button type="submit" form="go-to-key">Confirm</Button>
               </DialogFooter>
          </AppModal>
     )
}