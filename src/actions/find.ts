import { findValue, getField } from "@/lib/helpers/find"
import type { FindResult } from "@/lib/types/find"
import type { ITranslation } from "@/lib/types/data"
import { getErrorMessage } from "@/lib/utils"
import { getFindSchema } from "@/schemas"
import { FindType } from "@/schemas/types"
import type { TFunction } from "i18next"

export interface FindState {
     matches: { translation: ITranslation; index: number }[]
     currentIndex: number
}

export default class FindActions{
     public static find(values: FindType, table: ITranslation[], t: TFunction<"validation">): FindResult{
          try {
               const validatedFields = getFindSchema(t).safeParse(values)
               if(!validatedFields.success) return {success: false, error: t("invalid-fields")}
               const {mode, query, caseSensitive} = validatedFields.data
               const matches = table.map((translation, index) => ({ translation, index })).filter(({ translation }) => findValue(getField(translation, mode), query, caseSensitive))
               if (matches.length === 0) return { success: false, error: t("no-results") }
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
     public static findNext(state: FindState | null, t: TFunction<"validation">): FindResult {
          if (!state || state.matches.length === 0) return { success: false, error: t("no-active-search") }
          const currentIndex = (state.currentIndex + 1) % state.matches.length
          return {
               success: true,
               findState: { ...state, currentIndex },
               ...state.matches[currentIndex],
          }
     }
     public static findPrev(state: FindState | null, t: TFunction<"validation">): FindResult {
          if (!state || state.matches.length === 0) return { success: false, error: t("no-active-search") }
          const currentIndex = (state.currentIndex - 1 + state.matches.length) % state.matches.length
          return {
               success: true,
               findState: { ...state, currentIndex },
               ...state.matches[currentIndex],
          }
     }
     public static findMissing(table: ITranslation[], t: TFunction<"validation">): FindResult {
          const index = table.findIndex(item => item.translationString.trim() === "")
          if (index === -1) return { success: false, error: t("no-missing-translations") }
          return {
               success: true,
               index,
               translation: table[index],
          }
     }
}