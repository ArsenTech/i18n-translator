import { AutoTranslateType } from "@/schemas/types"
import { Control } from "react-hook-form"
import { SettingsTab, UpdaterStatus } from "./enums"
import { LucideIcon } from "lucide-react"

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
export type DesignType = "default" | "danger";
export interface ISettingsTab{
     page: SettingsTab,
     tabName: string,
     Icon: LucideIcon,
     Loader?: React.FC,
     LazyComponent: React.LazyExoticComponent<React.FC>,
     disabled?: boolean
}