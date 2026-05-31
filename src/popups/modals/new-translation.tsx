import AppModal from "@/components/popups/modal";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { NewTranslationType } from "@/schemas/types";
import { NewTranslationSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import SelectorField from "@/components/fields/selector";
import LanguageInput from "@/components/lang-input";
import FilePicker from "@/components/fields/file-picker";
import FilesystemActions from "@/actions/file-system";
import { PopupFormProps } from "@/lib/types";

const items = [
     {value: "json", label: "JSON File"},
     {value: "xml", label: "XML File"},
     {value: "po", label: "GNU gettext"},
     {value: "xliff", label: "XLIFF File"},
     {value: "resx", label: "Microsoft RESX File"}
]

export default function NewTranslationPopup({triggerButton}: PopupFormProps){
     const form = useForm<NewTranslationType>({
          resolver: zodResolver(NewTranslationSchema),
          defaultValues: {
               path: "",
               targetLanguageCode: "",
               format: "json"
          }
     })
     const onSubmit = (values: NewTranslationType) => {
          FilesystemActions.newTranslation(values)
     }
     return (
          <AppModal
               title="Create New Translation"
               description="Create a new translation file"
               triggerButton={triggerButton}
          >
               <form id="new-translation" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="path"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Base Language File Path</FieldLabel>
                                        <FilePicker
                                             {...field}
                                             invalid={fieldState.invalid}
                                             placeholder="C:/Users/username/Desktop/en.json"
                                             openText="Open the base language file"
                                        />
                                        {fieldState.invalid && (
                                             <FieldError errors={[fieldState.error]} />
                                        )}
                                   </Field>
                              )}
                         />
                         <Controller
                              control={form.control}
                              name="targetLanguageCode"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Translation file name</FieldLabel>
                                        <LanguageInput
                                             {...field}
                                             lang={field.value}
                                             onLangChange={field.onChange}
                                             id={field.name}
                                             aria-invalid={fieldState.invalid}
                                             placeholder="hy"
                                        />
                                        <FieldDescription>Using the language code as a new translation input is Recommended for all translators.</FieldDescription>
                                        {fieldState.invalid && (
                                             <FieldError errors={[fieldState.error]} />
                                        )}
                                   </Field>
                              )}
                         />
                         <Controller
                              control={form.control}
                              name="format"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>File Format</FieldLabel>
                                        <SelectorField
                                             {...field}
                                             items={items}
                                             invalid={fieldState.invalid}
                                             placeholder="Choose a Translation File Format"
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
                    <Button type="submit" form="new-translation">Create a translation</Button>
               </DialogFooter>
          </AppModal>
     )
}