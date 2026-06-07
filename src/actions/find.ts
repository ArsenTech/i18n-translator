import { ITranslation } from "@/lib/types/data"
import { getErrorMessage } from "@/lib/utils"
import { FindSchema } from "@/schemas"
import { FindType } from "@/schemas/types"

const findValue = (value: string, query: string, caseSensitive: boolean) =>
     caseSensitive ? value.includes(query) : value.toLowerCase().includes(query.toLowerCase())

export default class FindActions{
     public static find(values: FindType, table: ITranslation[]){
          try {
               const validatedFields = FindSchema.safeParse(values)
               if(!validatedFields.success) return {error: "All fields are invalid"}
               const {mode, query, caseSensitive} = validatedFields.data
               const translation = table.find(val => {
                    return mode==="source" ? findValue(val.baseString,query,caseSensitive) : mode==="translation" ? findValue(val.translationString,query,caseSensitive) : findValue(val.keyName,query,caseSensitive)
               })
               if(!translation) return {error: "No results found"}
               return {
                    success: true,
                    index: table.indexOf(translation),
                    translation
               }
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err)}
          }
     }
     public static findNext(){
          console.log("TODO: Implement Find Next")
     }
     public static findPrev(){
          console.log("TODO: Implement Find Previous")
     }
     public static findMissing(){
          console.log("TODO: Implement Find Missing keys")
     }
}