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
export interface GlossaryItem {
     source: string,
     target: string,
     partOfSpeech: "noun" | "verb" | "adjective",
     domain: string,
     found: boolean
}