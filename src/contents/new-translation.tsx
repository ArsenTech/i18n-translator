import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { NewTranslationType } from "@/schemas/types";
import { getNewTranslationSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import FileActions from "@/actions/file";
import type { PopupContentProps } from "@/lib/types/props";
import { lazy, Suspense, useTransition } from "react";
import LoadingButton from "@/components/loading-button";
import { FilePlus2 } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { useAppTranslation } from "@/context/translation";
import RecentTranslations from "@/lib/store/recent-translations";
import { Skeleton } from "@/components/ui/skeleton";
import { NEW_TRANSLATION_FORMATS } from "@/lib/constants/items";
import { useSettings } from "@/context/settings";
import FetcherActions from "@/actions/fetcher";
import { useTranslation } from "react-i18next";

const SelectorField = lazy(()=>import("@/components/fields/selector"))
const FilePicker = lazy(()=>import("@/components/fields/file-picker"))
const LanguageInput = lazy(()=>import("@/components/fields/lang-input"));

export default function NewTranslation({setOpen}: PopupContentProps){
     const {t} = useTranslation("file-actions")
     const {t: validationTxt} = useTranslation("validation")
     const {settings} = useSettings()
     const [isCreating, startTransition] = useTransition()
     const [isFetching, startFetching] = useTransition()
     const {setTable, updateLangs, setFiles, setBaseKeys, setIsDirty} = useAppTranslation()
     const form = useForm<NewTranslationType>({
          resolver: zodResolver(getNewTranslationSchema(validationTxt)),
          defaultValues: {
               path: "",
               targetLanguageCode: settings.targetLang ?? "",
               format: settings.defaultFormat
          }
     })
     const handleChangeFormat = (val: string) => {
          if(isFetching) return;
          startFetching(async()=>{
               const format = await FetcherActions.getFormatFromPath(val);
               if(!format) return;
               form.setValue("format",format)
          })
     }
     const onSubmit = (values: NewTranslationType) => {
          if (isCreating) return;
          startTransition(async()=>{
               try {
                    const res = await FileActions.newTranslation(
                         validationTxt,
                         values,
                         settings.autoDetectBaseLang,
                         settings.baseLang
                    );
                    if(res.error) toast.error(t("new.error"),{
                         description: res.error,
                         id: "create-error"
                    })
                    if(res.targetPath) {
                         await RecentTranslations.addRecent({
                              name: `${values.targetLanguageCode}.${values.format}`,
                              basePath: values.format==="xliff" ? res.targetPath : values.path,
                              targetPath: res.targetPath,
                              baseLang: res.code,
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
                              base: res.code,
                              target: values.targetLanguageCode
                         })
                         setOpen?.(false)
                         setIsDirty(false)
                         form.reset()
                    }
               } catch (err) {
                    toast.error(t("new.error"),{
                         description: getErrorMessage(err),
                         id: "create-error"
                    })
               }
          })
     }
     return (
          <>
               <form id="new-translation" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="path"
                              disabled={isCreating}
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>{t("new.base-path")}</FieldLabel>
                                        <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                             <FilePicker
                                                  {...field}
                                                  invalid={fieldState.invalid}
                                                  placeholder="C:/Users/username/Desktop/en.json"
                                                  openText={t("dialog.open-base")}
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
                                        <FieldLabel htmlFor={field.name}>{t("new.translation-name.title")}</FieldLabel>
                                        <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                             <LanguageInput
                                                  {...field}
                                                  lang={field.value}
                                                  onLangChange={field.onChange}
                                                  id={field.name}
                                                  aria-invalid={fieldState.invalid}
                                                  placeholder="hy"
                                             />
                                        </Suspense>
                                        <FieldDescription>{t("new.translation-name.desc")}</FieldDescription>
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
                                        <FieldLabel htmlFor={field.name}>{t("format.title")}</FieldLabel>
                                        <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                             <SelectorField
                                                  {...field}
                                                  items={NEW_TRANSLATION_FORMATS.map((val=>({
                                                       label: t(`format.${val}`),
                                                       value: val
                                                  })))}
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
                         loaderText={t("new.button.loading")}
                    >
                         <FilePlus2/>
                         {t("new.button.current")}
                    </LoadingButton>
               </DialogFooter>
          </>
     )
}