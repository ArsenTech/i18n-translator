import type { ITranslation } from "@/lib/types/data"
import { type CreateTranslationResult, type IBackendTranslation } from "@/lib/types/data/backend"
import { getErrorMessage } from "@/lib/utils"
import { NewTranslationSchema, OpenTranslationSchema, OpenXliffSchema } from "@/schemas"
import { NewTranslationType, OpenTranslationType, OpenXliffType } from "@/schemas/types"
import { invoke } from "@tauri-apps/api/core"
import { save } from "@tauri-apps/plugin-dialog"
import { detectLanguageCode, getFormatFromPath } from "@/lib/helpers"
import { ILangInputState } from "@/lib/types"
import FetcherActions from "./fetcher"
import { TranslationFormat } from "@/lib/types/enums"

export default class FileActions{
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
               const meta = await FetcherActions.getXliffMetadata(path)
               const res = await invoke<CreateTranslationResult>("create_translation", {
                    basePath: path,
                    baseLang: !meta ? detectLanguageCode(path) : meta.src_lang,
                    targetLang: targetLanguageCode,
                    format
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
               const baseFormat = await getFormatFromPath(basePath);
               const targetFormat = await getFormatFromPath(targetPath)
               if (baseFormat!==targetFormat) return {error: "Translation format should match the Base language format"}
               const res = await this.openBackendTranslation({
                    basePath,
                    targetPath,
                    format: baseFormat
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
     public static async openXliff(values: OpenXliffType) {
          try {
               const validatedFields = OpenXliffSchema.safeParse(values)
               if(!validatedFields.success) return {error: "All fields are invalid", data: []}
               const {translationPath} = validatedFields.data
               const fileFormat = await getFormatFromPath(translationPath);
               if(!fileFormat) return {error: "Format doesn't exist"}
               const res = await this.openBackendXliffTranslation(translationPath)
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
     public static async saveAll(table: ITranslation[], targetPath: string, langs: ILangInputState){
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
                    entries,
                    format: await getFormatFromPath(targetPath),
                    baseLang: langs.base,
                    targetLang: langs.target
               })
               return {success: "Translation saved successfully"}
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err)}
          }
     }
     public static async saveAs(table: ITranslation[], langs: ILangInputState){
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
                    entries,
                    format: await getFormatFromPath(targetPath),
                    baseLang: langs.base,
                    targetLang: langs.target
               })
               return {success: "Translation saved successfully"}
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err)}
          }
     }
     public static async openBackendTranslation({basePath, targetPath, format}: {
          basePath: string,
          targetPath: string,
          format: TranslationFormat
     }) {
          try {
               const res = await invoke<IBackendTranslation[]>("open_translation", {
                    basePath,
                    targetPath,
                    format
               })
               return res
          } catch (err){
               console.error(err)
               return []
          }
     }
     public static async openBackendXliffTranslation(path: string) {
          try {
               const res = await invoke<IBackendTranslation[]>("open_xliff", { path })
               return res
          } catch (err){
               console.error(err)
               return []
          }
     }
}