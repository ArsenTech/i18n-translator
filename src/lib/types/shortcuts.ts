import { TFunction } from "i18next"
import type { SetStateType, ILangInputState } from "."
import { AVAILABLE_SHORTCUTS } from "../constants/items"
import type { ITranslation } from "./data"
import type { ISettings } from "./settings"
import { DialogFilter } from "@tauri-apps/plugin-dialog"

export type AvailableShortcuts = typeof AVAILABLE_SHORTCUTS[number]
export type ShortcutsType = Record<AvailableShortcuts,(args: {
     table: ITranslation[],
     targetPath: string,
     setIsDirty: SetStateType<boolean>,
     setSelectedKeys: SetStateType<Set<string>>,
     langs: ILangInputState,
     settings: ISettings,
     t: TFunction<"validation">,
     filters: DialogFilter[]
})=>void>