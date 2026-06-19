import { AutoTranslateType } from "@/schemas/types"
import { Control } from "react-hook-form"
import { UpdaterStatus } from "./enums"

export interface PopupComponentProps{
     triggerButton?: React.ReactNode
     open?: boolean,
     setOpen?: (open: boolean) => void
}
export type PopupContentProps = Omit<PopupComponentProps,"triggerButton">
export interface AutoTranslateFieldProps{
     control: Control<AutoTranslateType>
}
export interface TreeNode {
     name: string
     fullPath: string
     children: TreeNode[]
}
export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>
export type SelectType = {label: string, value: string}
export interface ILangInputState{
     base: string,
     target: string
}
export type GlossaryTogglerType = "all" | "few"
export interface IUpdaterState{
     status: UpdaterStatus,
     newVersion: string | null,
     patchDate: Date | null,
     downloaded: number,
     total: number
}