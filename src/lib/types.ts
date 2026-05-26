export interface ITranslation{
     keyName: string,
     baseString: string,
     translationString: string,
     lineNumber: number
}

export interface TreeNode {
     name: string
     fullPath: string
     children: TreeNode[]
}