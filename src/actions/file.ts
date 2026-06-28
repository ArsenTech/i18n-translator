import type { ITranslation } from "@/lib/types/data"
import type { CreateTranslationResult, IBackendTranslation } from "@/lib/types/data/backend"
import { getErrorMessage } from "@/lib/utils"
import { getNewTranslationSchema, getOpenTranslationSchema, getOpenXliffSchema } from "@/schemas"
import { NewTranslationType, OpenTranslationType, OpenXliffType } from "@/schemas/types"
import { invoke } from "@tauri-apps/api/core"
import { type DialogFilter, save } from "@tauri-apps/plugin-dialog"
import { detectLanguageCode } from "@/lib/helpers"
import type { ILangInputState } from "@/lib/types"
import FetcherActions from "./fetcher"
import { TranslationFormat } from "@/lib/types/enums"
import type { TFunction } from "i18next"

export default class FileActions{
     public static async newTranslation(t: TFunction<"validation">, values: NewTranslationType, autoDetectBaseLang: boolean, defaultBaseLang?: string): Promise<{
          error?: string,
          success?: string,
          data: ITranslation[],
          targetPath?: string
          code: string
     }>{
          try {
               const validatedFields = getNewTranslationSchema(t).safeParse(values)
               if(!validatedFields.success) return {error: t("invalid-fields"), data: [], code: ""}
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
                    success: t("success.new-translation"),
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
     public static async openTranslation(values: OpenTranslationType, t: TFunction<"validation">){
          try {
               const validatedFields = getOpenTranslationSchema(t).safeParse(values)
               if(!validatedFields.success) return {error: t("invalid-fields"), data: []}
               const {basePath, targetPath} = validatedFields.data
               const baseFormat = await FetcherActions.getFormatFromPath(basePath);
               const targetFormat = await FetcherActions.getFormatFromPath(targetPath)
               if (baseFormat!==targetFormat) return {error: t("different-formats")}
               const res = await this.openBackendTranslation({
                    basePath,
                    targetPath,
                    format: baseFormat
               })
               return {
                    success: t("success.open-translation"),
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
     public static async openXliff(values: OpenXliffType, t: TFunction<"validation">) {
          try {
               const validatedFields = getOpenXliffSchema(t).safeParse(values)
               if(!validatedFields.success) return {error: t("invalid-fields"), data: []}
               const {translationPath} = validatedFields.data
               const fileFormat = await FetcherActions.getFormatFromPath(translationPath);
               if(!fileFormat) return {error: t("format-not-found")}
               const res = await this.openBackendXliffTranslation(translationPath)
               return {
                    success: t("success.open-translation"),
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
          preserveMetadata: boolean,
          t: TFunction<"validation">
     ){
          if(!targetPath) return {error: t("target-empty")}
          const data = preserveTranslations ? table : table.filter(item => item.translationString.trim() !== "")
          if(data.length<=0) return {error: t("table-empty")}
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
               return {success: t("success.save-translation")}
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err)}
          }
     }
     public static async saveAs(
          table: ITranslation[],
          langs: ILangInputState,
          preserveTranslations: boolean,
          preserveMetadata: boolean,
          t: TFunction<"validation">,
          filters: DialogFilter[]
     ){
          const data = preserveTranslations ? table : table.filter(item => item.translationString.trim() !== "")
          if(data.length<=0) return {error: t("table-empty")}
          try {
               const targetPath = await save({
                    title: "Save Translation As",
                    filters
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
               return {success: t("success.save-translation")}
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