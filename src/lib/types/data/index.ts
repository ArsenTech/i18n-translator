export interface ITranslation{
     keyName: string,
     baseString: string,
     translationString: string,
     lineNumber: number
}

export interface ILangItem {
     flag: string
     name: string
     code: string
     type: "country" | "language"
     label: string
     value: string
}