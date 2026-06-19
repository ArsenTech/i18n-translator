import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Controller } from "react-hook-form"
import { AutoTranslateFieldProps } from "@/lib/types"

export default function LlamaAIFields({control}: AutoTranslateFieldProps){
     return (
          <>
          <Controller
               control={control}
               name="endpoint"
               render={({field, fieldState})=>(
                    <Field data-invalid={fieldState.invalid}>
                         <FieldLabel htmlFor={field.name}>Endpoint</FieldLabel>
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
                         <FieldLabel htmlFor={field.name}>Model</FieldLabel>
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