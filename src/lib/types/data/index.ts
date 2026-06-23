import { PARTS_OF_SPEECH } from "@/lib/constants/items";

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
     name: string
     code: string
     type: "country" | "language"
     label: string
     value: string
}