import AppModal from "@/components/popups/modal";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { BatchRenameKeysType } from "@/schemas/types";
import { BatchRenameKeysSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PopupFormProps } from "@/lib/types";
import TranslatorActions from "@/actions/translator";

export default function BatchRenameKeysPopup({triggerButton}: PopupFormProps){
     const form = useForm<BatchRenameKeysType>({
          resolver: zodResolver(BatchRenameKeysSchema),
          defaultValues: {
               from: "",
               to: "",
          }
     })
     const onSubmit = (values: BatchRenameKeysType) => {
          TranslatorActions.batchRename(values)
     }
     return (
          <AppModal
               size="sm"
               title="Batch rename keys"
               description="Rename many keys at once"
               triggerButton={triggerButton}
          >
               <form id="batch-rename" onSubmit={form.handleSubmit(onSubmit)}>
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
                                             placeholder="common.button.cancel"
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