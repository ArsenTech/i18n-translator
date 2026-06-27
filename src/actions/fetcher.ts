import type { ILangItem } from "@/lib/types/data";
import type { XliffMetadata } from "@/lib/types/data/backend";
import { invoke } from "@tauri-apps/api/core";
import { cache } from "react";
import {getName, getTauriVersion, getVersion, getIdentifier} from "@tauri-apps/api/app"
import { extname } from "@tauri-apps/api/path"
import { type FileType, TranslationFormat } from "@/lib/types/enums";
import type { TFunction } from "i18next";

const extensions: Record<string,TranslationFormat> = {
     "json": TranslationFormat.Json,
     "xml": TranslationFormat.Xml,
     "po": TranslationFormat.Po,
     "resx": TranslationFormat.Resx,
     "xliff": TranslationFormat.Xliff
}

export default class FetcherActions{
     public static fetchLanguages = cache(async(t: TFunction<"languages">, validationTxt: TFunction<"validation">)=>{
          const res = await fetch("/lang-list.json");
          if (!res.ok) throw new Error(validationTxt("fetch-lang-error"))
          const resData: ILangItem[] = await res.json();
          return resData.sort(({code: a},{code: b})=>{
               const aName = t(a), bName = t(b);
               return aName>bName ? 1 : aName<bName ? -1 : 0
          }).map(lang => ({
               ...lang,
               label: t(lang.code),
               value: lang.code,
          }))
     })
     public static getXliffMetadata = cache(async(path: string): Promise<XliffMetadata> => {
          try {
               const metadata = await invoke<XliffMetadata>("get_xliff_meta", { path })
               return metadata
          } catch (err){
               console.error(err)
               return {src_lang: "", trg_lang: ""}
          }
     })
     public static fetchDetails = cache(async() => {
          const [name, version, tauri, identifier] = await Promise.all([
               getName(),
               getVersion(),
               getTauriVersion(),
               getIdentifier()
          ])
          return {name, version, tauri, identifier}
     })
     public static getFileTypeFromPath = cache(async(basePath: string, format: TranslationFormat)=>{
          try {
               return await invoke<FileType>("detect_format",{basePath, format})
          } catch (err){
               console.error(err)
               return null
          }
     })
     public static getFormatFromPath = cache(async(path: string): Promise<TranslationFormat> =>{
          const extension = await extname(path)
          return extensions[extension]
     })
}