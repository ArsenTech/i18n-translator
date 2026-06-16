import AppModal from "@/components/popups/modal";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { AddToGlossaryType } from "@/schemas/types";
import { AddToGlossarySchema } from "@/schemas";
import { DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { PopupFormProps } from "@/lib/types";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import SelectorField from "@/components/fields/selector";
import { GLOSSARY_DOMAINS, PARTS_OF_SPEECH } from "@/lib/constants";
import ComboboxField from "@/components/fields/combobox-field";
import GlossaryActions from "@/lib/store/glossary";
import { toast } from "sonner";
import LoadingButton from "@/components/loading-button";
import { getErrorMessage } from "@/lib/utils";
import { useAppTranslation } from "@/context/translation";
import { useGlossary } from "@/context/glossary-sidebar";

export default function AddToGlossaryPopup({triggerButton}: PopupFormProps){
     const {langs} = useAppTranslation()
     const {setGlossary} = useGlossary()
     const [isAdding, startTransition] = useTransition()
     const form = useForm<AddToGlossaryType>({
          resolver: zodResolver(AddToGlossarySchema),
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
                    const res = await GlossaryActions.add(values, langs)
                    if(res.success) {
                         toast.success(res.success)
                         setGlossary(res.data)
                         form.reset()
                    } else {
                         toast.error("Failed to add the term to the glossary",{
                              description: res.error
                         })
                    }
               } catch (err) {
                    toast.error("Failed to add the term to the glossary",{
                         description: getErrorMessage(err)
                    })
               }
          })
     }
     return (
          <AppModal
               title="Add To Glossary"
               description="Add the term you're looking for to the glossary"
               triggerButton={triggerButton}
          >
               <form id="add-to-glossary" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                         <Controller
                              control={form.control}
                              name="term"
                              disabled={isAdding}
                              render={({field, fieldState})=>(
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Term</FieldLabel>
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
                                                  Case Sensitive
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
                                        <FieldLabel htmlFor={field.name}>Translation</FieldLabel>
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
                                             <FieldLabel htmlFor={field.name}>Part of Speech</FieldLabel>
                                             <SelectorField
                                                  {...field}
                                                  items={PARTS_OF_SPEECH.map(part=>({
                                                       label: part[0].toUpperCase() + part.slice(1),
                                                       value: part
                                                  }))}
                                                  invalid={fieldState.invalid}
                                                  placeholder="Choose a part of speech"
                                             />
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
                                             <FieldLabel htmlFor={field.name}>Domain</FieldLabel>
                                             <ComboboxField
                                                  {...field}
                                                  items={[...GLOSSARY_DOMAINS]}
                                                  invalid={fieldState.invalid}
                                                  placeholder="Choose a domain"
                                             />
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
                         Add To Glossary
                    </LoadingButton>
               </DialogFooter>
          </AppModal>
     )
}