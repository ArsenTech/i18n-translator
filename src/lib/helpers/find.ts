import { FindType } from "@/schemas/types";
import type { ITranslation } from "../types/data";

export function getField(item: ITranslation, mode: FindType["mode"]) {
     if (mode === "source") return item.baseString
     if (mode === "translation") return item.translationString
     return item.keyName
}
export function findValue(value: string, query: string, caseSensitive: boolean){
     if(caseSensitive) return value.includes(query);
     return value.toLowerCase().includes(query.toLowerCase());
}