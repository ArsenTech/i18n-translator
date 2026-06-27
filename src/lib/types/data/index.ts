import { AllLangCode } from "@/i18n/types";
import { PARTS_OF_SPEECH } from "@/lib/constants/combobox-items";

export interface ITranslation{
     keyName: string,
     baseString: string,
     translationString: string,
     lineNumber: number
}
export interface GlossaryEntry {
     term: string;
     translation: string;
     partOfSpeech: typeof PARTS_OF_SPEECH[number];
     domain: string;
     caseSensitive: boolean;
}
export interface ILangItem {
     flag: string
     code: AllLangCode
     type: "country" | "language"
     label: string
     value: string
}
export interface TreeNode {
     name: string
     fullPath: string
     children: TreeNode[]
}