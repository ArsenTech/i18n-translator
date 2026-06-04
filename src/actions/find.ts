import { getErrorMessage } from "@/lib/utils"
import { FindSchema } from "@/schemas"
import { FindType } from "@/schemas/types"

export default class FindActions{
     public static find(values: FindType){
          try {
               const validatedFields = FindSchema.safeParse(values)
               if(!validatedFields.success) return {error: "All fields are invalid"}
               console.log(`TODO: Implement finding with query "${validatedFields.data.query}" with mode "${validatedFields.data.mode}" and case sensitive ${validatedFields.data.caseSensitive}`)
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