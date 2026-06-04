import type { ITranslation } from "@/lib/types/data"
import type { CreateTranslationResult, IBackendTranslation } from "@/lib/types/data/backend"
import { getErrorMessage } from "@/lib/utils"
import { NewTranslationSchema, OpenTranslationSchema } from "@/schemas"
import { NewTranslationType, OpenTranslationType } from "@/schemas/types"
import { invoke } from "@tauri-apps/api/core"
import { save } from "@tauri-apps/plugin-dialog"

export default class FilesystemActions{
     public static async newTranslation(values: NewTranslationType): Promise<{
          error?: string,
          success?: string,
          data: ITranslation[],
          targetPath?: string
     }>{
          try {
               const validatedFields = NewTranslationSchema.safeParse(values)
               if(!validatedFields.success) return {error: "All fields are invalid", data: []}
               const {path, targetLanguageCode, format} = validatedFields.data
               const res = await invoke<CreateTranslationResult>("create_translation", {
                    basePath: path,
                    targetLanguageCode: targetLanguageCode,
                    format: format
               })
               return {
                    success: "Translation created successfully",
                    data: res.entries.map(val=>({
                         keyName: val.key_name,
                         translationString: val.translation_string,
                         lineNumber: val.line_number,
                         baseString: val.base_string
                    })),
                    targetPath: res.target_path
               }
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err), data: []}
          }
     }
     public static async openTranslation(values: OpenTranslationType){
          try {
               const validatedFields = OpenTranslationSchema.safeParse(values)
               if(!validatedFields.success) return {error: "All fields are invalid", data: []}
               const {basePath, targetPath} = validatedFields.data
               const res = await invoke<IBackendTranslation[]>("open_translation", {
                    basePath,
                    targetPath
               })
               return {
                    success: "Translation opened successfully",
                    data: res.map(val=>({
                         keyName: val.key_name,
                         translationString: val.translation_string,
                         lineNumber: val.line_number,
                         baseString: val.base_string
                    }))
               }
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err), data: []}
          }
     }
     public static async saveAll(table: ITranslation[], targetPath: string){
          if(!targetPath) return {error: "Target Path is empty. Save cancelled"}
          if(table.length<=0) return {error: "Table itself is empty"}
          try {
               const entries: IBackendTranslation[] = table.map(val=>({
                    key_name: val.keyName,
                    base_string: val.baseString,
                    translation_string: val.translationString,
                    line_number: val.lineNumber
               }))
               await invoke("save_translation", {
                    targetPath,
                    entries
               })
               return {success: "Translation saved successfully"}
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err)}
          }
     }
     public static async saveAs(table: ITranslation[]){
          if(table.length<=0) return {error: "Table itself is empty"}
          try {
               const targetPath = await save({
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
               if(!targetPath) return;
               const entries: IBackendTranslation[] = table.map(val=>({
                    key_name: val.keyName,
                    base_string: val.baseString,
                    translation_string: val.translationString,
                    line_number: val.lineNumber
               }))
               await invoke("save_translation", {
                    targetPath,
                    entries
               })
               return {success: "Translation saved successfully"}
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err)}
          }
     }
     public static undo(){
          console.log("TODO: Implement Undo Action")
     }
     public static redo(){
          console.log("TODO: Implement Redo Action")
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