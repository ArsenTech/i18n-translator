import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Controller } from "react-hook-form"
import type { AutoTranslateFieldProps } from "@/lib/types/props"

export default function GeminiFields({control}: AutoTranslateFieldProps){
     return (
          <Controller
               control={control}
               name="apiKey"
               render={({field, fieldState})=>(
                    <Field data-invalid={fieldState.invalid}>
                         <FieldLabel htmlFor={field.name}>API Key</FieldLabel>
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
     )
}