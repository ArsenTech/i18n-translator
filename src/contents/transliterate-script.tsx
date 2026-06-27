import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { TransliterateScriptType } from "@/schemas/types";
import { TransliterateScriptSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import TranslatorActions from "@/actions/translator";
import { SUPPORTED_SCRIPTS } from "@/lib/constants/items";
import { lazy, Suspense, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { SelectType } from "@/lib/types";

const SelectorField = lazy(()=>import("@/components/fields/selector"))

export default function TransliterateScript(){
     const {t} = useTranslation("transliterate")
     const form = useForm<TransliterateScriptType>({
          resolver: zodResolver(TransliterateScriptSchema),
          defaultValues: {
               source: "latin",
               target: "cyrillic"
          }
     })
     const onSubmit = (values: TransliterateScriptType) => {
          TranslatorActions.transliterateScript(values)
     }
     const allScripts: SelectType[] = useMemo(()=>SUPPORTED_SCRIPTS.map(val=>({
          label: t(`supported-scripts.${val}`),
          value: val
     })),[t])
     return (
          <>
               <form id="transliterate" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="source"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>{t("source.label")}</FieldLabel>
                                        <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                             <SelectorField
                                                  {...field}
                                                  items={allScripts}
                                                  invalid={fieldState.invalid}
                                                  placeholder={t("source.placeholder")}
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
                              name="target"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>{t("target.label")}</FieldLabel>
                                        <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                             <SelectorField
                                                  {...field}
                                                  items={allScripts}
                                                  invalid={fieldState.invalid}
                                                  placeholder={t("target.placeholder")}
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
                    <Button type="button" variant="secondary">{t("buttons.find")}</Button>
                    <Button type="submit" form="transliterate">{t("buttons.transliterate")}</Button>
               </DialogFooter>
          </>
     )
}