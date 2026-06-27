import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { ReplaceTranslationType } from "@/schemas/types";
import { getReplaceTranslationSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import type { PopupComponentProps } from "@/lib/types/props";
import TranslatorActions from "@/actions/translator";
import { useAppTranslation } from "@/context/translation";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function ReplaceTranslation({setOpen}: PopupComponentProps){
     const {t} = useTranslation("replace")
     const {t: validationTxt} = useTranslation("validation")
     const {table, setTable, setIsDirty} = useAppTranslation()
     const form = useForm<ReplaceTranslationType>({
          resolver: zodResolver(getReplaceTranslationSchema(validationTxt)),
          defaultValues: {
               from: "",
               to: "",
               caseSensitive: false
          }
     })
     const onSubmit = (values: ReplaceTranslationType) => {
          const res = TranslatorActions.replaceTranslation(values,table,validationTxt)
          if(res.error) toast.error(t("error"),{
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
               <form id="replace" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="from"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>{t("from")}</FieldLabel>
                                        <Input
                                             {...field}
                                             id={field.name}
                                             aria-invalid={fieldState.invalid}
                                             placeholder="Cancel"
                                        />
                                        {fieldState.invalid && (
                                             <FieldError errors={[fieldState.error]} />
                                        )}
                                   </Field>
                              )}
                         />
                         <Controller
                              control={form.control}
                              name="caseSensitive"
                              render={({field, fieldState})=>(
                                   <Field
                                        orientation="horizontal"
                                        data-invalid={fieldState.invalid}
                                   >
                                        <FieldContent>
                                             <FieldLabel htmlFor={field.name}>
                                                  {t("case-sensitive")}
                                             </FieldLabel>
                                             {fieldState.invalid && (
                                                  <FieldError errors={[fieldState.error]} />
                                             )}
                                        </FieldContent>
                                        <Switch
                                             id={field.name}
                                             name={field.name}
                                             checked={field.value}
                                             onCheckedChange={field.onChange}
                                             aria-invalid={fieldState.invalid}
                                        />
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
                                             placeholder="Չեղարկել"
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
                    <Button type="submit" form="replace">{t("button")}</Button>
               </DialogFooter>
          </>
     )
}