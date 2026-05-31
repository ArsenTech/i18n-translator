import AppModal from "@/components/popups/modal";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { OpenTranslationType } from "@/schemas/types";
import { OpenTranslationSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import LangSelector from "@/components/lang-selector";
import FilePicker from "@/components/fields/file-picker";
import FilesystemActions from "@/actions/file-system";
import { PopupFormProps } from "@/lib/types";

export default function OpenTranslationPopup({triggerButton}: PopupFormProps){
     const form = useForm<OpenTranslationType>({
          resolver: zodResolver(OpenTranslationSchema),
          defaultValues: {
               basePath: "",
               baseLang: "",
               targetPath: "",
               targetLang: ""
          }
     })
     const onSubmit = (values: OpenTranslationType) => {
          FilesystemActions.openTranslation(values)
     }
     return (
          <AppModal
               title="Open Translation"
               description="Open base and target language translations to start translating"
               triggerButton={triggerButton}
          >
               <form id="open-translation" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <FieldSet>
                              <FieldLegend>Base Language</FieldLegend>
                         </FieldSet>
                         <FieldGroup>
                              <Controller
                                   control={form.control}
                                   name="basePath"
                                   render={({field, fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor={field.name}>File Path</FieldLabel>
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
                                   name="baseLang"
                                   render={({field, fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor={field.name}>Language</FieldLabel>
                                             <LangSelector
                                                  {...field}
                                                  invalid={fieldState.invalid}
                                                  placeholder="Choose a Base Language"
                                             />
                                             {fieldState.invalid && (
                                                  <FieldError errors={[fieldState.error]} />
                                             )}
                                        </Field>
                                   )}
                              />
                         </FieldGroup>
                         <FieldSeparator/>
                         <FieldSet>
                              <FieldLegend>Translation</FieldLegend>
                         </FieldSet>
                         <FieldGroup>
                              <Controller
                                   control={form.control}
                                   name="targetPath"
                                   render={({field, fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor={field.name}>File Path</FieldLabel>
                                             <FilePicker
                                                  {...field}
                                                  invalid={fieldState.invalid}
                                                  placeholder="C:/Users/username/Desktop/hy.json"
                                                  openText="Open the translation file"
                                             />
                                             {fieldState.invalid && (
                                                  <FieldError errors={[fieldState.error]} />
                                             )}
                                        </Field>
                                   )}
                              />
                              <Controller
                                   control={form.control}
                                   name="targetLang"
                                   render={({field, fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor={field.name}>Language</FieldLabel>
                                             <LangSelector
                                                  {...field}
                                                  invalid={fieldState.invalid}
                                                  placeholder="Choose a Translation Language"
                                             />
                                             {fieldState.invalid && (
                                                  <FieldError errors={[fieldState.error]} />
                                             )}
                                        </Field>
                                   )}
                              />
                         </FieldGroup>
                    </FieldGroup>
               </form>
               <DialogFooter>
                    <Button type="submit" form="open-translation">Open Translation</Button>
               </DialogFooter>
          </AppModal>
     )
}