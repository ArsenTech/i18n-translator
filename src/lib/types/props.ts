import { AutoTranslateType } from "@/schemas/types"
import { Control } from "react-hook-form"

export interface PopupComponentProps{
     triggerButton?: React.ReactNode
     open?: boolean,
     setOpen?: (open: boolean) => void
}
export type PopupContentProps = Omit<PopupComponentProps,"triggerButton">
export interface AutoTranslateFieldProps{
     control: Control<AutoTranslateType>
}