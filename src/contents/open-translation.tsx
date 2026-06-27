import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { OpenTranslationType } from "@/schemas/types";
import { getOpenTranslationSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import FileActions from "@/actions/file";
import type { PopupComponentProps } from "@/lib/types/props";
import { lazy, Suspense, useState, useTransition } from "react";
import LoadingButton from "@/components/loading-button";
import { FolderOpen } from "lucide-react";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";
import { useAppTranslation } from "@/context/translation";
import { detectLanguageCode } from "@/lib/helpers";
import RecentTranslations from "@/lib/store/recent-translations";
import { Skeleton } from "@/components/ui/skeleton";
import FetcherActions from "@/actions/fetcher";
import { useSettings } from "@/context/settings";
import { getFileName } from "@/lib/helpers/fs";
import { useTranslation } from "react-i18next";

const LangSelector = lazy(()=>import("@/components/fields/lang-selector"))
const FilePicker = lazy(()=>import("@/components/fields/file-picker"))

export default function OpenTranslation({setOpen}: PopupComponentProps){
     const {t} = useTranslation("file-actions")
     const {t: validationTxt} = useTranslation("validation")
     const [isOpening, startTransition] = useTransition()
     const [isFetching, setIsFetching] = useState(false)
     const {settings} = useSettings()
     const {setTable, updateLangs, setFiles, setBaseKeys, setIsDirty} = useAppTranslation()
     const form = useForm<OpenTranslationType>({
          resolver: zodResolver(getOpenTranslationSchema(validationTxt)),
          defaultValues: {
               basePath: "",
               baseLang: settings.baseLang ?? "",
               targetPath: "",
               targetLang: settings.targetLang ??""
          }
     })
     const onSubmit = (values: OpenTranslationType) => {
          if (isOpening) return;
          startTransition(async()=>{
               try {
                    const res = await FileActions.openTranslation(values,validationTxt)
                    if(res.error) toast.error(t("open.error"),{
                         description: res.error,
                         id: "open-error"
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
                              format: await FetcherActions.getFormatFromPath(values.basePath)
                         })
                         updateLangs({
                              base: values.baseLang,
                              target: values.targetLang
                         })
                         setFiles({
                              basePath: values.basePath,
                              targetPath: values.targetPath,
                              format: await FetcherActions.getFormatFromPath(values.basePath)
                         })
                         setOpen?.(false)
                         setIsDirty(false)
                         form.reset()
                    }
               } catch (err) {
                    toast.error(t("open.error"),{
                         description: getErrorMessage(err),
                         id: "open-error"
                    })
               }
          })
     }
     const handleChangeLang = async(val: string, type: "baseLang" | "targetLang") => {
          if(isFetching || !settings.autoDetectBaseLang) return;
          setIsFetching(true);
          try {
               const format = await FetcherActions.getFormatFromPath(val)
               const fileType = await FetcherActions.getFileTypeFromPath(val,format)
               const code = fileType ? detectLanguageCode(val, fileType) : settings.baseLang ?? ""
               if (code) form.setValue(type, code || settings[type] || "")
          } catch (err) {
               toast.error(t("lang-code-error"),{
                    description: getErrorMessage(err)
               })
          } finally {
               setIsFetching(false)
          }
     }
     return (
          <>
               <form id="open-translation" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <FieldSet>
                              <FieldLegend>{t("languages.base.label")}</FieldLegend>
                         </FieldSet>
                         <FieldGroup>
                              <Controller
                                   control={form.control}
                                   name="basePath"
                                   disabled={isOpening}
                                   render={({field, fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor={field.name}>{t("file-path")}</FieldLabel>
                                             <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                                  <FilePicker
                                                       {...field}
                                                       onChange={val=>{
                                                            field.onChange(val)
                                                            handleChangeLang(val,"baseLang")
                                                       }}
                                                       invalid={fieldState.invalid}
                                                       placeholder="C:/Users/username/Desktop/en.json"
                                                       openText={t("dialog.open-base")}
                                                       state="open"
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
                                   disabled={isOpening}
                                   render={({field, fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor={field.name}>{t("language")}</FieldLabel>
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
                         <FieldSeparator/>
                         <FieldSet>
                              <FieldLegend>{t("languages.target.label")}</FieldLegend>
                         </FieldSet>
                         <FieldGroup>
                              <Controller
                                   control={form.control}
                                   name="targetPath"
                                   disabled={isOpening}
                                   render={({field, fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor={field.name}>{t("file-path")}</FieldLabel>
                                             <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                                  <FilePicker
                                                       {...field}
                                                       onChange={val=>{
                                                            field.onChange(val)
                                                            handleChangeLang(val,"targetLang")
                                                       }}
                                                       invalid={fieldState.invalid}
                                                       placeholder="C:/Users/username/Desktop/hy.json"
                                                       openText={t("dialog.open-target")}
                                                       state="open"
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
                                   disabled={isOpening}
                                   render={({field, fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor={field.name}>{t("language")}</FieldLabel>
                                             <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                                  <LangSelector
                                                       {...field}
                                                       invalid={fieldState.invalid}
                                                       placeholder={t("languages.target.placeholder")}
                                                  />
                                             </Suspense>
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
                    <LoadingButton isLoading={isOpening} loaderText={t("open.button.loading")} type="submit" form="open-translation">
                         <FolderOpen/>
                         {t("open.button.current")}
                    </LoadingButton>
               </DialogFooter>
          </>
     )
}