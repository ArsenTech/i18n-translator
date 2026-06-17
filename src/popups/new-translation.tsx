import AppModal from "@/components/popups/modal";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { NewTranslationType } from "@/schemas/types";
import { NewTranslationSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import LanguageInput from "@/components/lang-input";
import FileActions from "@/actions/file";
import { PopupComponentProps } from "@/lib/types";
import { lazy, Suspense, useState, useTransition } from "react";
import LoadingButton from "@/components/loading-button";
import { FilePlus2 } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { useAppTranslation } from "@/context/translation";
import { detectLanguageCode, getFormatFromPath } from "@/lib/helpers";
import RecentTranslations from "@/lib/store/recent-translations";
import { TranslationFormat } from "@/lib/types/enums";
import { Skeleton } from "@/components/ui/skeleton";

const SelectorField = lazy(()=>import("@/components/fields/selector"))
const FilePicker = lazy(()=>import("@/components/fields/file-picker"))

const items = [
     {value: "json", label: "JSON File"},
     {value: "xml", label: "XML File"},
     {value: "po", label: "GNU gettext"},
     {value: "xliff", label: "XLIFF File"},
     {value: "resx", label: "Microsoft RESX File"}
]

export default function NewTranslationPopup({triggerButton}: PopupComponentProps){
     const [isCreating, startTransition] = useTransition()
     const [isFetching, startFetching] = useTransition()
     const [open, setOpen] = useState(false)
     const {setTable, updateLangs, setFiles, setBaseKeys, setIsDirty} = useAppTranslation()
     const form = useForm<NewTranslationType>({
          resolver: zodResolver(NewTranslationSchema),
          defaultValues: {
               path: "",
               targetLanguageCode: "",
               format: TranslationFormat.Json
          }
     })
     const handleChangeFormat = (val: string) => {
          if(isFetching) return;
          startFetching(async()=>{
               const format = await getFormatFromPath(val);
               if(!format) return;
               form.setValue("format",format)
          })
     }
     const onSubmit = (values: NewTranslationType) => {
          if (isCreating) return;
          const code = detectLanguageCode(values.path)
          startTransition(async()=>{
               try {
                    const res = await FileActions.newTranslation(values);
                    if(res.error) toast.error("Failed to create translation",{
                         description: res.error
                    })
                    if(res.targetPath) {
                         await RecentTranslations.addRecent({
                              name: `${values.targetLanguageCode}.${values.format}`,
                              basePath: values.format==="xliff" ? res.targetPath : values.path,
                              targetPath: res.targetPath,
                              baseLang: code,
                              targetLang: values.targetLanguageCode,
                              format: values.format
                         })
                         setFiles({
                              basePath: values.format==="xliff" ? res.targetPath : values.path,
                              targetPath: res.targetPath,
                              format: values.format
                         })
                    }
                    if(res.success) {
                         toast.success(res.success)
                         setTable(res.data)
                         setBaseKeys(new Set(res.data.map(item => item.keyName)))
                         updateLangs({
                              base: code,
                              target: values.targetLanguageCode
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
                                        <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                             <FilePicker
                                                  {...field}
                                                  invalid={fieldState.invalid}
                                                  placeholder="C:/Users/username/Desktop/en.json"
                                                  openText="Open the base language file"
                                                  onChange={val=>{
                                                       field.onChange(val);
                                                       handleChangeFormat(val)
                                                  }}
                                             />
                                        </Suspense>
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
                                        <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                             <SelectorField
                                                  {...field}
                                                  items={items}
                                                  invalid={fieldState.invalid}
                                                  placeholder="Choose a Translation File Format"
                                             />
                                        </Suspense>
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