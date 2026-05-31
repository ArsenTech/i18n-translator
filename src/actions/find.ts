import { FindType } from "@/schemas/types"

export default class FindActions{
     public static find(values: FindType){
          console.log(`TODO: Implement finding with query "${values.query}" with mode "${values.mode}" and case sensitive ${values.caseSensitive}`)
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