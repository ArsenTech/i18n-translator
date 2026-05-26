export interface ITranslation{
     keyName: string,
     baseString: string,
     translationString: string,
}

export interface TreeNode {
     name: string
     fullPath: string
     children: TreeNode[]
}