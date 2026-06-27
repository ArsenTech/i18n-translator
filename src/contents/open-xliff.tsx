import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { OpenXliffType } from "@/schemas/types";
import { OpenXliffSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import FileActions from "@/actions/file";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense, useTransition } from "react";
import LoadingButton from "@/components/loading-button";
import { FolderOpen } from "lucide-react";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";
import { useAppTranslation } from "@/context/translation";
import { getFileName } from "@/lib/helpers/fs";
import RecentTranslations from "@/lib/store/recent-translations";
import { TranslationFormat } from "@/lib/types/enums";
import { Skeleton } from "@/components/ui/skeleton";
import FetcherActions from "@/actions/fetcher";
import { useSettings } from "@/context/settings";
import { useTranslation } from "react-i18next";

const LangSelector = lazy(()=>import("@/components/fields/lang-selector"))
const XliffFilePicker = lazy(()=>import("@/components/fields/file-picker/xliff"))

export default function OpenXliff({setOpen}: PopupComponentProps){
     const {t} = useTranslation("file-actions")
     const {settings} = useSettings()
     const [isOpening, startTransition] = useTransition()
     const [isFetching, startFetching] = useTransition()
     const {setTable, updateLangs, setFiles, setBaseKeys, setIsDirty} = useAppTranslation()
     const form = useForm<OpenXliffType>({
          resolver: zodResolver(OpenXliffSchema),
          defaultValues: {
               translationPath: "",
               baseLang: settings.baseLang ?? "",
               targetLang: settings.targetLang ?? "",
          }
     })
     const handleChangeLang = (val: string) => {
          if(!settings.xliffAutoDetect || !settings.xliffPreserveMeta || isFetching) return;
          startFetching(async() => {
               try {
                    const meta = await FetcherActions.getXliffMetadata(val);
                    if(settings.autoDetectBaseLang) form.setValue("baseLang", meta.src_lang || settings.baseLang || "")
                    form.setValue("targetLang", meta.trg_lang || settings.targetLang || "")
               } catch (err) {
                    toast.error(t("lang-code-error"),{
                         description: getErrorMessage(err)
                    })
               }
          })
     }
     const onSubmit = (values: OpenXliffType) => {
          if (isOpening) return;
          startTransition(async()=>{
               try {
                    const res = await FileActions.openXliff(values)
                    if(res.error) toast.error(t("open-xliff.error"),{
                         description: res.error,
                         id: "open-xliff-error"
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
                         updateLangs({
                              base: values.baseLang,
                              target: values.targetLang
                         })
                         setFiles({
                              basePath: values.translationPath,
                              targetPath: values.translationPath,
                              format: TranslationFormat.Xliff
                         })
                         setOpen?.(false)
                         setIsDirty(false)
                         form.reset()
                    }
               } catch (err) {
                    toast.error(t("open-xliff.error"),{
                         description: getErrorMessage(err),
                         id: "open-xliff-error"
                    })
               }
          })
     }
     return (
          <>
               <form id="open-xliff" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="translationPath"
                              disabled={isOpening || isFetching}
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>{t("open-xliff.xliff-file")}</FieldLabel>
                                        <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                             <XliffFilePicker
                                                  {...field}
                                                  onChange={val=>{
                                                       field.onChange(val)
                                                       handleChangeLang(val)
                                                  }}
                                                  invalid={fieldState.invalid}
                                                  placeholder="C:/Users/username/Desktop/translation.xliff"
                                                  openText={t("dialog.open-xliff")}
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
                              name="baseLang"
                              disabled={isOpening || isFetching}
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>{t("languages.base.label")}</FieldLabel>
                                        <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                             <LangSelector
                                                  {...field}
                                                  invalid={fieldState.invalid}
                                                  placeholder={t("languages.base.placeholder")}
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
                              name="targetLang"
                              disabled={isOpening || isFetching}
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>{t("languages.target.label")}</FieldLabel>
                                        <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                             <LangSelector
                                                  {...field}
                                                  invalid={fieldState.invalid}
                                                  placeholder={t("languages.base.placeholder")}
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
                    <LoadingButton isLoading={isOpening} disabled={isFetching} loaderText={t("open-xliff.button.loading")} type="submit" form="open-xliff">
                         <FolderOpen/>
                         {t("open-xliff.button.current")}
                    </LoadingButton>
               </DialogFooter>
          </>
     )
}