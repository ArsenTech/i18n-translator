import type { ITranslation } from "@/lib/types/data"
import type { CreateTranslationResult, IBackendTranslation } from "@/lib/types/data/backend"
import { getErrorMessage } from "@/lib/utils"
import { NewTranslationSchema, OpenTranslationSchema, OpenXliffSchema } from "@/schemas"
import { NewTranslationType, OpenTranslationType, OpenXliffType } from "@/schemas/types"
import { invoke } from "@tauri-apps/api/core"
import { save } from "@tauri-apps/plugin-dialog"
import { detectLanguageCode } from "@/lib/helpers"
import type { ILangInputState } from "@/lib/types"
import FetcherActions from "./fetcher"
import { TranslationFormat } from "@/lib/types/enums"

export default class FileActions{
     public static async newTranslation(values: NewTranslationType, autoDetectBaseLang: boolean, defaultBaseLang?: string): Promise<{
          error?: string,
          success?: string,
          data: ITranslation[],
          targetPath?: string
          code: string
     }>{
          try {
               const validatedFields = NewTranslationSchema.safeParse(values)
               if(!validatedFields.success) return {error: "All fields are invalid", data: [], code: ""}
               const {path, targetLanguageCode, format} = validatedFields.data
               const [fileType, meta] = await Promise.all([
                    FetcherActions.getFileTypeFromPath(path, format),
                    FetcherActions.getXliffMetadata(path)
               ])
               const fallback = defaultBaseLang ?? ""
               const code = !autoDetectBaseLang ? fallback : fileType ? detectLanguageCode(path, fileType) : fallback
               const res = await invoke<CreateTranslationResult>("create_translation", {
                    basePath: path,
                    baseLang: !meta ? code : meta.src_lang,
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
                    targetPath: res.target_path,
                    code
               }
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err), data: [], code: ""}
          }
     }
     public static async openTranslation(values: OpenTranslationType){
          try {
               const validatedFields = OpenTranslationSchema.safeParse(values)
               if(!validatedFields.success) return {error: "All fields are invalid", data: []}
               const {basePath, targetPath} = validatedFields.data
               const baseFormat = await FetcherActions.getFormatFromPath(basePath);
               const targetFormat = await FetcherActions.getFormatFromPath(targetPath)
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
               const fileFormat = await FetcherActions.getFormatFromPath(translationPath);
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
     public static async saveAll(
          table: ITranslation[],
          targetPath: string,
          langs: ILangInputState,
          preserveTranslations: boolean,
          preserveMetadata: boolean
     ){
          if(!targetPath) return {error: "Target Path is empty. Save cancelled"}
          const data = preserveTranslations ? table : table.filter(item => item.translationString.trim() !== "")
          if(data.length<=0) return {error: "Table itself is empty"}
          try {
               const entries: IBackendTranslation[] = data.map(val=>({
                    key_name: val.keyName,
                    base_string: val.baseString,
                    translation_string: val.translationString,
                    line_number: val.lineNumber
               }))
               let baseLang = langs.base;
               let targetLang = langs.target;
               const format = await FetcherActions.getFormatFromPath(targetPath)
               if (preserveMetadata && format === TranslationFormat.Xliff) {
                    const meta = await FetcherActions.getXliffMetadata(targetPath);
                    baseLang = meta.src_lang || baseLang;
                    targetLang = meta.trg_lang || targetLang;
               }
               await invoke("save_translation", {
                    targetPath,
                    entries,
                    format,
                    baseLang,
                    targetLang
               })
               return {success: "Translation saved successfully"}
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err)}
          }
     }
     public static async saveAs(
          table: ITranslation[],
          langs: ILangInputState,
          preserveTranslations: boolean,
          preserveMetadata: boolean
     ){
          const data = preserveTranslations ? table : table.filter(item => item.translationString.trim() !== "")
          if(data.length<=0) return {error: "Table itself is empty"}
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
               const entries: IBackendTranslation[] = data.map(val=>({
                    key_name: val.keyName,
                    base_string: val.baseString,
                    translation_string: val.translationString,
                    line_number: val.lineNumber
               }))
               let baseLang = langs.base;
               let targetLang = langs.target;
               const format = await FetcherActions.getFormatFromPath(targetPath)
               if (preserveMetadata && format === TranslationFormat.Xliff) {
                    const meta = await FetcherActions.getXliffMetadata(targetPath);
                    baseLang = meta.src_lang || baseLang;
                    targetLang = meta.trg_lang || targetLang;
               }
               await invoke("save_translation", {
                    targetPath,
                    entries,
                    format,
                    baseLang,
                    targetLang
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