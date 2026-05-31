export interface ITranslation{
     keyName: string,
     baseString: string,
     translationString: string,
     lineNumber: number
}
export interface PopupFormProps{
     triggerButton: React.ReactNode
}
export interface TreeNode {
     name: string
     fullPath: string
     children: TreeNode[]
}
export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>