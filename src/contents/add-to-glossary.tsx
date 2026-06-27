import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { AddToGlossaryType } from "@/schemas/types";
import { getAddToGlossarySchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { lazy, Suspense, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { GLOSSARY_DOMAINS, PARTS_OF_SPEECH } from "@/lib/constants/combobox-items";
import GlossaryActions from "@/lib/store/glossary";
import { toast } from "sonner";
import LoadingButton from "@/components/loading-button";
import { getErrorMessage } from "@/lib/utils";
import { useAppTranslation } from "@/context/translation";
import { useGlossary } from "@/context/glossary";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

const ComboboxField = lazy(()=>import("@/components/fields/combobox-field"))
const SelectorField = lazy(()=>import("@/components/fields/selector"))

export default function AddToGlossary(){
     const {t} = useTranslation("glossary")
     const {t: validationTxt} = useTranslation("validation")
     const {langs} = useAppTranslation()
     const {setGlossary} = useGlossary()
     const [isAdding, startTransition] = useTransition()
     const form = useForm<AddToGlossaryType>({
          resolver: zodResolver(getAddToGlossarySchema(validationTxt)),
          defaultValues: {
               term: "",
               partOfSpeech: "noun",
               translation: "",
               caseSensitive: false,
               domain: "General"
          }
     })
     const onSubmit = (values: AddToGlossaryType) => {
          startTransition(async() => {
               try {
                    const res = await GlossaryActions.add(values, langs, validationTxt)
                    if(res.success) {
                         toast.success(res.success)
                         setGlossary(res.data)
                         form.reset()
                    } else {
                         toast.error(t("add-glossary.error"),{
                              description: res.error,
                              id: "add-error"
                         })
                    }
               } catch (err) {
                    toast.error(t("add-glossary.error"),{
                         description: getErrorMessage(err),
                         id: "add-error"
                    })
               }
          })
     }
     return (
          <>
               <form id="add-to-glossary" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="term"
                              disabled={isAdding}
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>{t("add-glossary.term")}</FieldLabel>
                                        <Input
                                             {...field}
                                             id={field.name}
                                             placeholder="Create"
                                             aria-invalid={fieldState.invalid}
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
                              disabled={isAdding}
                              render={({field, fieldState})=>(
                                   <Field
                                        orientation="horizontal"
                                        data-invalid={fieldState.invalid}
                                   >
                                        <FieldContent>
                                             <FieldLabel htmlFor={field.name}>
                                                  {t("add-glossary.case-sensitive")}
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
                              name="translation"
                              disabled={isAdding}
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>{t("add-glossary.translation")}</FieldLabel>
                                        <Input
                                             {...field}
                                             id={field.name}
                                             placeholder="Ստեղծել"
                                             aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                             <FieldError errors={[fieldState.error]} />
                                        )}
                                   </Field>
                              )}
                         />
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <Controller
                                   control={form.control}
                                   name="partOfSpeech"
                                   disabled={isAdding}
                                   render={({field, fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor={field.name}>{t("add-glossary.part-of-speech.label")}</FieldLabel>
                                             <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                                  <SelectorField
                                                       {...field}
                                                       items={PARTS_OF_SPEECH.map(part=>({
                                                            label: t(`parts-of-speech.${part}`),
                                                            value: part
                                                       }))}
                                                       invalid={fieldState.invalid}
                                                       placeholder={t("add-glossary.part-of-speech.placeholder")}
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
                                   name="domain"
                                   disabled={isAdding}
                                   render={({field, fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor={field.name}>{t("add-glossary.domain.label")}</FieldLabel>
                                             <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                                  <ComboboxField
                                                       {...field}
                                                       items={[...GLOSSARY_DOMAINS]}
                                                       invalid={fieldState.invalid}
                                                       placeholder={t("add-glossary.domain.placeholder")}
                                                  />
                                             </Suspense>
                                             {fieldState.invalid && (
                                                  <FieldError errors={[fieldState.error]} />
                                             )}
                                        </Field>
                                   )}
                              />
                         </div>
                    </FieldGroup>
               </form>
               <DialogFooter>
                    <LoadingButton isLoading={isAdding} type="submit" form="add-to-glossary">
                         {t("add-glossary.button")}
                    </LoadingButton>
               </DialogFooter>
          </>
     )
}