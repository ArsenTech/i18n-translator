import AppModal from "@/components/popups/modal";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useWatch } from "react-hook-form"
import { FindType } from "@/schemas/types";
import { FindSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import FindActions from "@/actions/find";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react";
import RadioField from "@/components/fields/radio-field";
import { Switch } from "@/components/ui/switch";
import { PopupComponentProps } from "@/lib/types";
import { useAppTranslation } from "@/context/translation";
import { useState } from "react";
import { toast } from "sonner";
import ComboboxField from "@/components/fields/combobox-field";
import TranslatorActions from "@/actions/translator";

const items = [
     {value: "key", label: "Key"},
     {value: "source", label: "Source"},
     {value: "translation", label: "Translation"},
]

export default function FindPopup({triggerButton}: PopupComponentProps){
     const {visibleTable, setVisibleCount, keyNames, setCurrentTranslation, setInput, setFindState} = useAppTranslation()
     const [open, setOpen] = useState(false)
     const form = useForm<FindType>({
          resolver: zodResolver(FindSchema),
          defaultValues: {
               query: "",
               mode: "key",
               caseSensitive: false
          }
     })
     const onSubmit = (values: FindType) => {
          const res = FindActions.find(values, visibleTable)
          if(res.success) {
               if(res.findState) setFindState(res.findState)
               TranslatorActions.jumpToTranslation({
                    translation: res.translation,
                    index: res.index,
                    setCurrentTranslation,
                    setInput,
                    setVisibleCount,
               })
               setOpen(false);
               form.reset()
          } else {
               toast.error("Failed to find the query inside the translation",{
                    description: res.error
               })
          }
     }
     const mode = useWatch({
          control: form.control,
          name: "mode"
     })
     return (
          <AppModal
               size="sm"
               title="Find the translation"
               description="Search for a translation you're looking for"
               triggerButton={triggerButton}
               open={open} onOpenChange={setOpen}
          >
               <form id="find" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="query"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Keyword</FieldLabel>
                                        {mode==="key" ? (
                                             <ComboboxField
                                                  {...field}
                                                  invalid={fieldState.invalid}
                                                  placeholder="command.buttons.cancel"
                                                  items={keyNames}
                                                  Icon={Search}
                                             />
                                        ) : (
                                             <InputGroup>
                                                  <InputGroupInput
                                                       {...field}
                                                       id={field.name}
                                                       aria-invalid={fieldState.invalid}
                                                       placeholder="Search translation keys"
                                                  />
                                                  <InputGroupAddon>
                                                       <Search/>
                                                  </InputGroupAddon>
                                             </InputGroup>
                                        )}
                                        {fieldState.invalid && (
                                             <FieldError errors={[fieldState.error]} />
                                        )}
                                   </Field>
                              )}
                         />
                         <Controller
                              control={form.control}
                              name="mode"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Search Mode</FieldLabel>
                                        <RadioField
                                             {...field}
                                             invalid={fieldState.invalid}
                                             items={items}
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
                    <Button type="submit" form="find">Find</Button>
               </DialogFooter>
          </AppModal>
     )
}