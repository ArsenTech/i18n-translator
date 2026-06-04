import AppModal from "@/components/popups/modal";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { NewTranslationType } from "@/schemas/types";
import { NewTranslationSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import SelectorField from "@/components/fields/selector";
import LanguageInput from "@/components/lang-input";
import FilePicker from "@/components/fields/file-picker";
import FileActions from "@/actions/file";
import { PopupFormProps } from "@/lib/types";
import { useState, useTransition } from "react";
import LoadingButton from "@/components/loading-button";
import { FilePlus2 } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { useAppTranslation } from "@/context/translation";
import { detectLanguageCode } from "@/lib/helpers";
import RecentTranslations from "@/lib/store/recent-translations";

const items = [
     {value: "json", label: "JSON File"},
     {value: "xml", label: "XML File"},
     {value: "po", label: "GNU gettext"},
     {value: "xliff", label: "XLIFF File"},
     {value: "resx", label: "Microsoft RESX File"}
]

export default function NewTranslationPopup({triggerButton}: PopupFormProps){
     const [isCreating, startTransition] = useTransition()
     const [open, setOpen] = useState(false)
     const {setTable, updateLangs, setFiles} = useAppTranslation()
     const form = useForm<NewTranslationType>({
          resolver: zodResolver(NewTranslationSchema),
          defaultValues: {
               path: "",
               targetLanguageCode: "",
               format: "json"
          }
     })
     const onSubmit = (values: NewTranslationType) => {
          if (isCreating) return;
          const code = detectLanguageCode(values.path)
          startTransition(async()=>{
               try {
                    const res = await FileActions.newTranslation(values);
                    if(res.error) toast.error("Failed to create translation",{
                         description: res.error
                    })
                    if(res.success) {
                         toast.success(res.success)
                         setTable(res.data)
                         updateLangs({
                              base: code,
                              target: values.targetLanguageCode
                         })
                         setOpen(false)
                         form.reset()
                    }
                    if(res.targetPath) {
                         await RecentTranslations.addRecent({
                              name: `${values.targetLanguageCode}.${values.format}`,
                              basePath: values.path,
                              targetPath: res.targetPath,
                              baseLang: code,
                              targetLang: values.targetLanguageCode
                         })
                         setFiles({
                              basePath: values.path,
                              targetPath: res.targetPath
                         })
                    }
               } catch (err) {
                    toast.error("Failed to create translation",{
                         description: getErrorMessage(err)
                    })
               }
          })
     }
     return (
          <AppModal
               open={open}
               onOpenChange={setOpen}
               title="Create New Translation"
               description="Create a new translation file"
               triggerButton={triggerButton}
          >
               <form id="new-translation" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="path"
                              disabled={isCreating}
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
                              disabled={isCreating}
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
                              disabled={isCreating}
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
                    <LoadingButton
                         type="submit"
                         form="new-translation"
                         isLoading={isCreating}
                         loaderText="Creating..."
                    >
                         <FilePlus2/>
                         Create a translation
                    </LoadingButton>
               </DialogFooter>
          </AppModal>
     )
}