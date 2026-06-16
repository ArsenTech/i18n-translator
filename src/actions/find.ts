import { findValue } from "@/lib/helpers"
import { ITranslation } from "@/lib/types/data"
import { getErrorMessage } from "@/lib/utils"
import { FindSchema } from "@/schemas"
import { FindType } from "@/schemas/types"

export interface FindState {
     matches: { translation: ITranslation; index: number }[]
     currentIndex: number
}

function getField(item: ITranslation, mode: FindType["mode"]) {
     if (mode === "source") return item.baseString
     if (mode === "translation") return item.translationString
     return item.keyName
}

type FindSuccess = {
     success: true
     translation: ITranslation
     index: number
     findState?: FindState
}
type FindError = {
     success: false
     error: string
}
export type FindResult = FindSuccess | FindError

export default class FindActions{
     public static find(values: FindType, table: ITranslation[]): FindResult{
          try {
               const validatedFields = FindSchema.safeParse(values)
               if(!validatedFields.success) return {success: false, error: "All fields are invalid"}
               const {mode, query, caseSensitive} = validatedFields.data
               const matches = table.map((translation, index) => ({ translation, index })) .filter(({ translation }) =>findValue(getField(translation, mode), query, caseSensitive))
               if (matches.length === 0) return { success: false, error: "No results found" }
               return {
                    success: true,
                    findState: {
                         matches,
                         currentIndex: 0,
                    },
                    ...matches[0],
               }
          } catch (err) {
               console.error(err)
               return {success: false, error: getErrorMessage(err)}
          }
     }
     public static findNext(state: FindState | null): FindResult {
          if (!state || state.matches.length === 0) return { success: false, error: "No active search" }
          const currentIndex = (state.currentIndex + 1) % state.matches.length
          return {
               success: true,
               findState: { ...state, currentIndex },
               ...state.matches[currentIndex],
          }
     }
     public static findPrev(state: FindState | null): FindResult {
          if (!state || state.matches.length === 0) return { success: false, error: "No active search" }
          const currentIndex = (state.currentIndex - 1 + state.matches.length) % state.matches.length
          return {
               success: true,
               findState: { ...state, currentIndex },
               ...state.matches[currentIndex],
          }
     }
     public static findMissing(table: ITranslation[]): FindResult {
          const index = table.findIndex(item => item.translationString.trim() === "")
          if (index === -1) return { success: false, error: "No missing translations found" }
          return {
               success: true,
               index,
               translation: table[index],
          }
     }
}