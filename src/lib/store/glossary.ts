import { AddToGlossarySchema } from "@/schemas";
import { AddToGlossaryType } from "@/schemas/types";
import { LazyStore } from "@tauri-apps/plugin-store";
import { GlossaryEntry, ILangInputState } from "../types";
import { getErrorMessage } from "../utils";

const store = new LazyStore("glossary.json")

export default class GlossaryActions{
     public static async add(values: AddToGlossaryType, langs: ILangInputState){
          try {
               const validatedFields = AddToGlossarySchema.safeParse(values)
               if(!validatedFields.success) return {error: "All fields are invalid", data: []}
               const {
                    term,
                    translation,
                    partOfSpeech,
                    domain,
                    caseSensitive,
               } = validatedFields.data;

               const glossaries = await this.getGlossary(langs);
               const exists = glossaries.some(
                    item =>
                         item.term === term &&
                         item.translation === translation &&
                         item.partOfSpeech === partOfSpeech &&
                         item.domain === domain &&
                         item.caseSensitive === caseSensitive
               );
               if (exists) {
                    return {
                         error: "This glossary entry already exists",
                         data: []
                    };
               }
               glossaries.push({
                    term,
                    translation,
                    partOfSpeech,
                    domain,
                    caseSensitive,
               })
               await store.set(`${langs.base}-${langs.target}`,glossaries),
               await store.save()
               return {success: "Term added to glossary successfully", data: glossaries}
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err), data: []}
          }
     }
     public static async getGlossary(langs: ILangInputState) {
          if (!langs.base.trim() || !langs.target.trim()) {
               throw new Error("Base and target languages are required");
          }
          return (
               await store.get<GlossaryEntry[]>(`${langs.base}-${langs.target}`)
          ) ?? [];
     }
     public static async clearGlossary(){
          return store.clear()
     }
}