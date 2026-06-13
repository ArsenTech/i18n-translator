import { invoke } from "@tauri-apps/api/core"
import { LazyStore } from "@tauri-apps/plugin-store"
import { IBackendTranslation } from "../types/data/backend"
import { ITranslation } from "../types/data"
import { TranslationFormat } from "../types/enums"

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
     public static async openRecent(item: RecentTranslation): Promise<{
          error?: string,
          success?: string,
          data: ITranslation[]
     }>{
          try {
               const res = await invoke<IBackendTranslation[]>("open_translation", {
                    basePath: item.basePath,
                    targetPath: item.targetPath,
                    format: item.format
               })
               return {
                    success: "Translation opened successfully",
                    data: res.map(val=>({
                         keyName: val.key_name,
                         translationString: val.translation_string,
                         lineNumber: val.line_number,
                         baseString: val.base_string
                    })),
               }
          } catch (err) {
               console.error(err)
               return {error: "Something went wrong", data: []}
          }
     }
     public static async clearRecent(){
          await store.clear()
     }
}