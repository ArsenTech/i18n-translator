import AppModal from "@/components/popups/modal";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { OpenTranslationType } from "@/schemas/types";
import { OpenTranslationSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import LangSelector from "@/components/lang-selector";
import FilePicker from "@/components/fields/file-picker";
import FileActions from "@/actions/file";
import { PopupComponentProps } from "@/lib/types";
import { useState, useTransition } from "react";
import LoadingButton from "@/components/loading-button";
import { FolderOpen } from "lucide-react";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";
import { useAppTranslation } from "@/context/translation";
import { detectLanguageCode, getFileName, getFormatFromPath } from "@/lib/helpers";
import RecentTranslations from "@/lib/store/recent-translations";

export default function OpenTranslationPopup({triggerButton}: PopupComponentProps){
     const [isOpening, startTransition] = useTransition()
     const [open, setOpen] = useState(false)
     const {setTable, updateLangs, setFiles, setBaseKeys, setIsDirty} = useAppTranslation()
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
          if (isOpening) return;
          startTransition(async()=>{
               try {
                    const res = await FileActions.openTranslation(values)
                    if(res.error) toast.error("Failed to create translation",{
                         description: res.error
                    })
                    if(res.success) {
                         toast.success(res.success)
                         setTable(res.data)
                         setBaseKeys(new Set(res.data.map(item => item.keyName)))
                         await RecentTranslations.addRecent({
                              name: getFileName(values.targetPath),
                              baseLang: values.baseLang,
                              targetLang: values.targetLang,
                              basePath: values.basePath,
                              targetPath: values.targetPath,
                              format: await getFormatFromPath(values.basePath)
                         })
                         updateLangs({
                              base: values.baseLang,
                              target: values.targetLang
                         })
                         setFiles({
                              basePath: values.basePath,
                              targetPath: values.targetPath,
                              format: await getFormatFromPath(values.basePath)
                         })
                         setOpen(false)
                         setIsDirty(false)
                         form.reset()
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
                                   disabled={isOpening}
                                   render={({field, fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor={field.name}>File Path</FieldLabel>
                                             <FilePicker
                                                  {...field}
                                                  onChange={val=>{
                                                       field.onChange(val)
                                                       const code = detectLanguageCode(val)
                                                       if (code) {
                                                            form.setValue("baseLang", code)
                                                       }
                                                  }}
                                                  invalid={fieldState.invalid}
                                                  placeholder="C:/Users/username/Desktop/en.json"
                                                  openText="Open the base language file"
                                                  state="open"
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
                                   disabled={isOpening}
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
                                   disabled={isOpening}
                                   render={({field, fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor={field.name}>File Path</FieldLabel>
                                             <FilePicker
                                                  {...field}
                                                  onChange={val=>{
                                                       field.onChange(val)
                                                       const code = detectLanguageCode(val)
                                                       if (code) {
                                                            form.setValue("targetLang", code)
                                                       }
                                                  }}
                                                  invalid={fieldState.invalid}
                                                  placeholder="C:/Users/username/Desktop/hy.json"
                                                  openText="Open the translation file"
                                                  state="open"
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
                                   disabled={isOpening}
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
                    <LoadingButton isLoading={isOpening} loaderText="Opening..." type="submit" form="open-translation">
                         <FolderOpen/>
                         Open Translation
                    </LoadingButton>
               </DialogFooter>
          </AppModal>
     )
}