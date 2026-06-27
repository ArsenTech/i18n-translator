import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useWatch } from "react-hook-form"
import { FindType } from "@/schemas/types";
import { getFindSchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import FindActions from "@/actions/find";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import type { PopupContentProps } from "@/lib/types/props";
import { useAppTranslation } from "@/context/translation";
import { lazy, Suspense } from "react";
import { toast } from "sonner";
import TranslatorActions from "@/actions/translator";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioFieldLoader } from "@/loaders/fields";
import { FIND_OPTIONS } from "@/lib/constants/items";
import { useEditor } from "@/context/editor";
import { useTranslation } from "react-i18next";

const ComboboxField = lazy(()=>import("@/components/fields/combobox-field"))
const RadioField = lazy(()=>import("@/components/fields/radio-field"))

export default function FindContent({setOpen}: PopupContentProps){
     const {t} = useTranslation("find")
     const {t: validationTxt} = useTranslation("validation")
     const {visibleTable, keyNames} = useAppTranslation()
     const {setVisibleCount, setCurrentTranslation, setInput, setFindState} = useEditor()
     const form = useForm<FindType>({
          resolver: zodResolver(getFindSchema(validationTxt)),
          defaultValues: {
               query: "",
               mode: "key",
               caseSensitive: false
          }
     })
     const onSubmit = (values: FindType) => {
          const res = FindActions.find(values, visibleTable, validationTxt)
          if(res.success) {
               if(res.findState) setFindState(res.findState)
               TranslatorActions.jumpToTranslation({
                    translation: res.translation,
                    index: res.index,
                    setCurrentTranslation,
                    setInput,
                    setVisibleCount,
               })
               setOpen?.(false);
               form.reset()
          } else {
               toast.error(t("query-error"),{
                    description: res.error
               })
          }
     }
     const mode = useWatch({
          control: form.control,
          name: "mode"
     })
     return (
          <>
               <form id="find" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="query"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>{t("keyword.label")}</FieldLabel>
                                        {mode==="key" ? (
                                             <Suspense fallback={<Skeleton className="h-8 w-full"/>}>
                                                  <ComboboxField
                                                       {...field}
                                                       invalid={fieldState.invalid}
                                                       placeholder="command.buttons.cancel"
                                                       items={keyNames}
                                                       Icon={Search}
                                                  />
                                             </Suspense>
                                        ) : (
                                             <InputGroup>
                                                  <InputGroupInput
                                                       {...field}
                                                       id={field.name}
                                                       aria-invalid={fieldState.invalid}
                                                       placeholder={t("keyword.placeholder")}
                                                  />
                                                  <InputGroupAddon>
                                                       <Search/>
                                                  </InputGroupAddon>
                                             </InputGroup>
                                        )}
                                        {fieldState.invalid && (
                                             <FieldError errors={[fieldState.error]} />
                                        )}
                                   </Field>
                              )}
                         />
                         <Controller
                              control={form.control}
                              name="mode"
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>{t("mode.title")}</FieldLabel>
                                        <Suspense fallback={<RadioFieldLoader length={FIND_OPTIONS.length}/>}>
                                             <RadioField
                                                  {...field}
                                                  invalid={fieldState.invalid}
                                                  items={FIND_OPTIONS.map(val=>({
                                                       label: t(`mode.${val}`),
                                                       value: val
                                                  }))}
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
                    </FieldGroup>
               </form>
               <DialogFooter>
                    <Button type="submit" form="find">{t("button")}</Button>
               </DialogFooter>
          </>
     )
}