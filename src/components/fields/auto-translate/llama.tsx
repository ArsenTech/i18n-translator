import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Controller } from "react-hook-form"
import type { AutoTranslateFieldProps } from "@/lib/types/props"
import { useTranslation } from "react-i18next"

export default function LlamaAIFields({control}: AutoTranslateFieldProps){
     const {t} = useTranslation("auto-translate")
     return (
          <>
          <Controller
               control={control}
               name="endpoint"
               render={({field, fieldState})=>(
                    <Field data-invalid={fieldState.invalid}>
                         <FieldLabel htmlFor={field.name}>{t("endpoint")}</FieldLabel>
                         <Input
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                         />
                         {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                         )}
                    </Field>
               )}
          />
          <Controller
               control={control}
               name="model"
               render={({field, fieldState})=>(
                    <Field data-invalid={fieldState.invalid}>
                         <FieldLabel htmlFor={field.name}>{t("model")}</FieldLabel>
                         <Input
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                         />
                         {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                         )}
                    </Field>
               )}
          />
          </>
     )
}