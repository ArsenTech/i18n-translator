import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { BatchRenameKeysType } from "@/schemas/types";
import { getBatchRenameKeysSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import TranslatorActions from "@/actions/translator";
import { useAppTranslation } from "@/context/translation";
import { lazy, Suspense } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { PopupContentProps } from "@/lib/types/props";
import { useTranslation } from "react-i18next";

const ComboboxField = lazy(()=>import("@/components/fields/combobox-field"))

export default function BatchRenameKeys({setOpen}: PopupContentProps){
     const {t} = useTranslation("replace")
     const {t: validationTxt} = useTranslation("validation")
     const {table, setTable, keyNames, setIsDirty} = useAppTranslation()
     const form = useForm<BatchRenameKeysType>({
          resolver: zodResolver(getBatchRenameKeysSchema(validationTxt)),
          defaultValues: {
               from: "",
               to: "",
          }
     })
     const onSubmit = (values: BatchRenameKeysType) => {
          const res = TranslatorActions.batchRename(values, table, validationTxt)
          if(res.error) toast.error(t("batch-rename.error"),{
               description: res.error
          })
          if(res.success) {
               toast.success(res.success)
               setOpen?.(false)
               setTable(res.data)
               setIsDirty(true)
               form.reset()
          }
     }
     return (
          <>
               <form id="batch-rename" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="from"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>{t("from")}</FieldLabel>
                                        <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                             <ComboboxField
                                                  {...field}
                                                  invalid={fieldState.invalid}
                                                  placeholder="common.button.cancel"
                                                  items={keyNames}
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
                              name="to"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>{t("to")}</FieldLabel>
                                        <Input
                                             {...field}
                                             id={field.name}
                                             aria-invalid={fieldState.invalid}
                                             placeholder="common.buttons.cancel"
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
                    <Button type="submit" form="batch-rename">{t("batch-rename.button")}</Button>
               </DialogFooter>
          </>
     )
}