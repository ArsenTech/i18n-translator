import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { AutoTranslateType } from "@/schemas/types"
import { Control, Controller } from "react-hook-form"

interface AutoTranslateFieldProps{
     control: Control<AutoTranslateType>
}

export function GeminiFields({control}: AutoTranslateFieldProps){
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
export function LibreTranslateFields({control}: AutoTranslateFieldProps){
     return (
          <>
          <Controller
               control={control}
               name="serverURL"
               render={({field, fieldState})=>(
                    <Field data-invalid={fieldState.invalid}>
                         <FieldLabel htmlFor={field.name}>Server URL</FieldLabel>
                         <Input
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder="http://localhost:5000"
                         />
                         {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                         )}
                    </Field>
               )}
          />
          <Controller
               control={control}
               name="apiKey"
               render={({field, fieldState})=>(
                    <Field data-invalid={fieldState.invalid}>
                         <FieldLabel htmlFor={field.name}>API Key (optional)</FieldLabel>
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
export function LlamaAIFields({control}: AutoTranslateFieldProps){
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