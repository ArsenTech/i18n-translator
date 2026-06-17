import { PARTS_OF_SPEECH } from "../constants"

export interface PopupFormProps{
     triggerButton?: React.ReactNode
     open?: boolean,
     setOpen?: (open: boolean) => void
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
export interface GlossaryEntry {
     term: string;
     translation: string;
     partOfSpeech: typeof PARTS_OF_SPEECH[number];
     domain: string;
     caseSensitive: boolean;
}
export type GlossaryTogglerType = "all" | "few"