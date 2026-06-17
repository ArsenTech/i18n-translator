import AppModal from "@/components/popups/modal";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { BatchRenameKeysType } from "@/schemas/types";
import { BatchRenameKeysSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import { PopupComponentProps } from "@/lib/types";
import TranslatorActions from "@/actions/translator";
import { useAppTranslation } from "@/context/translation";
import { useState } from "react";
import { toast } from "sonner";
import ComboboxField from "@/components/fields/combobox-field";
import { Input } from "@/components/ui/input";

export default function BatchRenameKeysPopup({triggerButton}: PopupComponentProps){
     const {table, setTable, keyNames, setIsDirty} = useAppTranslation()
     const [open, setOpen] = useState(false)
     const form = useForm<BatchRenameKeysType>({
          resolver: zodResolver(BatchRenameKeysSchema),
          defaultValues: {
               from: "",
               to: "",
          }
     })
     const onSubmit = (values: BatchRenameKeysType) => {
          const res = TranslatorActions.batchRename(values, table)
          if(res.error) toast.error("Failed to replace translations",{
               description: res.error
          })
          if(res.success) {
               toast.success(res.success)
               setOpen(false)
               setTable(res.data)
               setIsDirty(true)
               form.reset()
          }
     }
     return (
          <AppModal
               size="sm"
               title="Batch rename keys"
               description="Rename many keys at once"
               triggerButton={triggerButton}
               open={open} onOpenChange={setOpen}
          >
               <form id="batch-rename" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="from"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>From</FieldLabel>
                                        <ComboboxField
                                             {...field}
                                             invalid={fieldState.invalid}
                                             placeholder="common.button.cancel"
                                             items={keyNames}
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
                                             placeholder="common.buttons.cancel"
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
                    <Button type="submit" form="batch-rename">Rename Keys</Button>
               </DialogFooter>
          </AppModal>
     )
}