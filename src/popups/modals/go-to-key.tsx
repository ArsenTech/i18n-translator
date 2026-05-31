import AppModal from "@/components/popups/modal";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { GoToKeyNameType } from "@/schemas/types";
import { GoToKeyNameSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react";
import TranslatorActions from "@/actions/translator";
import { PopupFormProps } from "@/lib/types";

export default function GoToKeyNamePopup({triggerButton}: PopupFormProps){
     const form = useForm<GoToKeyNameType>({
          resolver: zodResolver(GoToKeyNameSchema),
          defaultValues: {
               keyName: ""
          }
     })
     const onSubmit = (values: GoToKeyNameType) => {
          TranslatorActions.goToKeyName(values)
     }
     return (
          <AppModal
               title="Go to translation key name"
               description="Jump into the provided key name"
               triggerButton={triggerButton}
          >
               <form id="go-to-key" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="keyName"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Translation Key Name</FieldLabel>
                                        <InputGroup>
                                             <InputGroupInput
                                                  {...field}
                                                  id={field.name}
                                                  aria-invalid={fieldState.invalid}
                                                  placeholder="command.buttons.cancel"
                                             />
                                             <InputGroupAddon>
                                                  <Search/>
                                             </InputGroupAddon>
                                        </InputGroup>
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