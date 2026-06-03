import type { ITranslation } from "@/lib/types/data"
import type { IBackendTranslation } from "@/lib/types/data/backend"
import { NewTranslationSchema } from "@/schemas"
import { BatchRenameKeysType, NewTranslationType, OpenTranslationType, ReplaceTranslationType } from "@/schemas/types"
import { invoke } from "@tauri-apps/api/core"
import { save } from "@tauri-apps/plugin-dialog"

export default class FilesystemActions{
     public static async newTranslation(values: NewTranslationType): Promise<{
          error?: string,
          success?: string,
          data: ITranslation[]
     }>{
          try {
               const validatedFields = NewTranslationSchema.safeParse(values)
               if(!validatedFields.success) return {error: "All fields are invalid", data: []}
               const {path, targetLanguageCode, format} = validatedFields.data
               const res = await invoke<IBackendTranslation[]>("create_translation", {
                    basePath: path,
                    targetLanguageCode: targetLanguageCode,
                    format: format
               })
               return {
                    success: "Translation created successfully",
                    data: res.map(val=>({
                         keyName: val.key_name,
                         translationString: val.translation_string,
                         lineNumber: val.line_number,
                         baseString: val.base_string
                    }))
               }
          } catch (err) {
               console.error(err)
               return {error: "Something went wrong", data: []}
          }
     }
     public static openTranslation(values: OpenTranslationType){
          console.log(`TODO: Implement Open Translation Action from ${values.targetPath}`)
     }
     public static openRecent(){
          console.log("TODO: Implement Open Recent translations (by path ofc) Action")
     }
     public static saveAll(){
          console.log("TODO: Implement Save All Action")
     }
     public static async saveAs(){
          const path = await save({
               title: "Save Translation As",
               filters: [
                    {
                         name: "JSON Files",
                         extensions: ["json"]
                    },
                    {
                         name: "XML Files",
                         extensions: ["xml"]
                    },
                    {
                         name: "GNU gettext",
                         extensions: ["po", "pot", "mo"]
                    },
                    {
                         name: "XLIFF Files",
                         extensions: ["xliff", "xlf"]
                    },
                    {
                         name: "Microsoft RESX Files",
                         extensions: ["resx"]
                    },
               ]
          })
          if(!path) return;
          console.log(`TODO: Implement Save as Action into ${path}`)
     }
     public static undo(){
          console.log("TODO: Implement Undo Action")
     }
     public static redo(){
          console.log("TODO: Implement Redo Action")
     }
     public static replaceTranslation(values: ReplaceTranslationType){
          console.log(`TODO: Implement Replace translation Action from ${values.from} to ${values.to}`)
     }
     public static batchRename(values: BatchRenameKeysType){
          console.log(values)
          console.log("TODO: Implement batch rename Action")
     }
     public static cut(){
          console.log("TODO: Implement Cut Action")
     }
     public static copy(){
          console.log("TODO: Implement Copy Action")
     }
     public static paste(){
          console.log("TODO: Implement Paste Action")
     }
     public static selectAll(){
          console.log("TODO: Implement Select All Action")
     }
}