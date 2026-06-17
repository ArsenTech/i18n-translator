import { AddToGlossarySchema } from "@/schemas";
import { AddToGlossaryType } from "@/schemas/types";
import { LazyStore } from "@tauri-apps/plugin-store";
import type { GlossaryEntry } from "@/lib/types/data"
import type { ILangInputState } from "../types";
import { getErrorMessage } from "../utils";

const store = new LazyStore("glossary.json")

export default class GlossaryActions{
     public static async setGlossary(langs: ILangInputState, values: GlossaryEntry[]){
          if (!langs.base.trim() || !langs.target.trim()) {
               throw new Error("Base and target languages are required");
          }
          await store.set(`${langs.base}-${langs.target}`, values),
          await store.save()
     }
     public static async add(values: AddToGlossaryType, langs: ILangInputState){
          if (!langs.base.trim() || !langs.target.trim()) {
               throw new Error("Base and target languages are required");
          }
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
               await this.setGlossary(langs,glossaries)
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
     public static jumpToNextBlankField({ glossary, currEntry, onSelectEntry, setInput }: {
          glossary: GlossaryEntry[]
          currEntry: GlossaryEntry | null,
          onSelectEntry: (entry: GlossaryEntry) => void
          setInput: (input: string) => void
     }) {
          const currentIndex = currEntry ? glossary.findIndex(item => item.term === currEntry.term) : -1
          const next = glossary.slice(currentIndex + 1).find(item => item.translation.trim() === "")
          if (!next) return
          onSelectEntry(next)
          setInput(next.translation)
     }
     public static jumpToPrevBlankField({ glossary, currEntry, onSelectEntry, setInput }: {
          glossary: GlossaryEntry[]
          currEntry: GlossaryEntry | null,
          onSelectEntry: (entry: GlossaryEntry) => void
          setInput: (input: string) => void
     }) {
          const currentIndex = currEntry ? glossary.findIndex(item => item.term === currEntry.term) : -1
          for (let i = currentIndex - 1; i >= 0; i--) {
               if (glossary[i].translation.trim() === "") {
                    onSelectEntry(glossary[i])
                    setInput(glossary[i].translation)
                    return
               }
          }
     }
     public static borrowFromSource(currEntry: GlossaryEntry | null, onInputChange: (input: string) => void){
          if(!currEntry) return;
          onInputChange(currEntry.term)
     }
}