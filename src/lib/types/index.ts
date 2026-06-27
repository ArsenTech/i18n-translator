import { SettingsTab, TranslationFormat, UpdaterStatus } from "./enums"
import type { LucideIcon } from "lucide-react"

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>
export type SelectType = {label: string, value: string}
export interface ILangInputState{
     base: string,
     target: string
}
export interface IUpdaterState{
     status: UpdaterStatus,
     newVersion: string | null,
     downloaded: number,
     total: number
}
export interface ISettingsTab{
     page: SettingsTab,
     Icon: LucideIcon,
     Loader?: React.FC,
     LazyComponent: React.LazyExoticComponent<React.FC>,
     disabled?: boolean
}
export interface TranslationFiles {
     basePath: string
     targetPath: string,
     format: TranslationFormat | null
}