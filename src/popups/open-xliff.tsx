import AppModal from "@/components/popups/modal";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { OpenXliffType } from "@/schemas/types";
import { OpenXliffSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import LangSelector from "@/components/lang-selector";
import FileActions from "@/actions/file";
import { ILangInputState, PopupFormProps } from "@/lib/types";
import { useState, useTransition } from "react";
import LoadingButton from "@/components/loading-button";
import { FolderOpen } from "lucide-react";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";
import { useAppTranslation } from "@/context/translation";
import { getFileName } from "@/lib/helpers";
import XliffFilePicker from "@/components/fields/file-picker/xliff";
import { XliffMetadata } from "@/lib/types/data/backend";
import { invoke } from "@tauri-apps/api/core";
import RecentTranslations from "@/lib/store/recent-translations";
import { TranslationFormat } from "@/lib/types/enums";
import { useGlossary } from "@/context/glossary-sidebar";
import GlossaryActions from "@/lib/store/glossary";

export default function OpenXliffPopup({triggerButton}: PopupFormProps){
     const [isOpening, startTransition] = useTransition()
     const [isFetching, startFetching] = useTransition()
     const [open, setOpen] = useState(false)
     const {setTable, updateLangs, setFiles, setBaseKeys, setIsDirty} = useAppTranslation()
     const {setGlossary} = useGlossary()
     const form = useForm<OpenXliffType>({
          resolver: zodResolver(OpenXliffSchema),
          defaultValues: {
               translationPath: "",
               baseLang: "",
               targetLang: ""
          }
     })
     const handleChangeLang = (val: string) => {
          if(isFetching) return;
          startFetching(async() => {
               const meta = await invoke<XliffMetadata>("get_xliff_meta", { path: val })
               form.setValue("baseLang", meta.src_lang)
               form.setValue("targetLang", meta.trg_lang)
          })
     }
     const onSubmit = (values: OpenXliffType) => {
          if (isOpening) return;
          startTransition(async()=>{
               try {
                    const res = await FileActions.openXliff(values)
                    if(res.error) toast.error("Failed to create translation",{
                         description: res.error
                    })
                    if(res.success) {
                         toast.success(res.success)
                         setTable(res.data)
                         setBaseKeys(new Set(res.data.map(item => item.keyName)))
                         await RecentTranslations.addRecent({
                              name: getFileName(values.translationPath),
                              baseLang: values.baseLang,
                              targetLang: values.targetLang,
                              basePath: values.translationPath,
                              targetPath: values.translationPath,
                              format: TranslationFormat.Xliff
                         })
                         const langs: ILangInputState = {
                              base: values.baseLang,
                              target: values.targetLang
                         }
                         updateLangs(langs)
                         const glossary = await GlossaryActions.getGlossary(langs)
                         setGlossary(glossary)
                         setFiles({
                              basePath: values.translationPath,
                              targetPath: values.translationPath,
                              format: TranslationFormat.Xliff
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
               title="Open XLIFF Translation"
               description="Open the XLIFF translation file to start translating"
               triggerButton={triggerButton}
          >
               <form id="open-xliff" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="translationPath"
                              disabled={isOpening || isFetching}
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>XLIFF File</FieldLabel>
                                        <XliffFilePicker
                                             {...field}
                                             onChange={val=>{
                                                  field.onChange(val)
                                                  handleChangeLang(val)
                                             }}
                                             invalid={fieldState.invalid}
                                             placeholder="C:/Users/username/Desktop/translation.xliff"
                                             openText="Open the XLIFF Translation file"
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
                              disabled={isOpening || isFetching}
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Base Language</FieldLabel>
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
                         <Controller
                              control={form.control}
                              name="targetLang"
                              disabled={isOpening || isFetching}
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Target Language</FieldLabel>
                                        <LangSelector
                                             {...field}
                                             invalid={fieldState.invalid}
                                             placeholder="Choose a Target Language"
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
                    <LoadingButton isLoading={isOpening} disabled={isFetching} loaderText="Opening..." type="submit" form="open-xliff">
                         <FolderOpen/>
                         Open XLIFF Translation
                    </LoadingButton>
               </DialogFooter>
          </AppModal>
     )
}