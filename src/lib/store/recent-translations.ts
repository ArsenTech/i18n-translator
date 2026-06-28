import { LazyStore } from "@tauri-apps/plugin-store"
import type { ITranslation } from "../types/data"
import { TranslationFormat } from "../types/enums"
import { getErrorMessage } from "../utils"
import FileActions from "@/actions/file"
import { TFunction } from "i18next"

export interface RecentTranslation {
     name: string
     basePath: string
     targetPath: string
     baseLang: string
     targetLang: string,
     format: TranslationFormat
}

const store = new LazyStore("recent-translations.json")

export default class RecentTranslations{
     public static async addRecent(item: RecentTranslation): Promise<RecentTranslation[]>{
          try {
               const current = await this.getRecent()
               const newList: RecentTranslation[] = [
                    item,
                    ...current.filter(x => x.targetPath !== item.targetPath),
               ].slice(0, 25)
               await store.set("recentTranslations", newList)
               await store.save()
               return newList
          } catch (err) {
               console.error(err)
               return []
          }
     }
     public static async getRecent(): Promise<RecentTranslation[]>{
          const list = await store.get<RecentTranslation[]>("recentTranslations") ?? []
          return list.slice(0,25)
     }
     public static async openRecent(item: RecentTranslation, t: TFunction<"validation">): Promise<{
          error?: string,
          success?: string,
          data: ITranslation[]
     }>{
          try {
               const res = await FileActions.openBackendTranslation({
                    basePath: item.basePath,
                    targetPath: item.targetPath,
                    format: item.format
               })
               return {
                    success: t("success.open-translation"),
                    data: res.map(val=>({
                         keyName: val.key_name,
                         translationString: val.translation_string,
                         lineNumber: val.line_number,
                         baseString: val.base_string
                    })),
               }
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err), data: []}
          }
     }
     public static async openRecentXliff(item: RecentTranslation, t: TFunction<"validation">): Promise<{
          error?: string,
          success?: string,
          data: ITranslation[]
     }>{
          try {
               if(item.basePath!==item.targetPath) return {error: t("xliff-required"), data: []};
               const res = await FileActions.openBackendXliffTranslation(item.basePath)
               return {
                    success: t("success.open-translation"),
                    data: res.map(val=>({
                         keyName: val.key_name,
                         translationString: val.translation_string,
                         lineNumber: val.line_number,
                         baseString: val.base_string
                    })),
               }
          } catch (err) {
               console.error(err)
               return {error: getErrorMessage(err), data: []}
          }
     }
     public static async clearRecent(t: TFunction<"validation">){
          try {
               await store.clear()
               return {success: t("success.clear-recent")}
          } catch (err){
               console.error(err)
               return {error: getErrorMessage(err)}
          }
     }
}