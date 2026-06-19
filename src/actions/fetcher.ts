import { ILangItem } from "@/lib/types/data";
import { XliffMetadata } from "@/lib/types/data/backend";
import { invoke } from "@tauri-apps/api/core";
import { cache } from "react";

export default class FetcherActions{
     public static fetchLanguages = cache(async()=>{
          const res = await fetch("/lang-list.json");
          if (!res.ok) throw new Error("Failed to fetch the data")
          const resData: ILangItem[] = await res.json();
          return resData.sort(({name: a},{name: b})=>a>b ? 1 : a<b ? -1 : 0).map(lang => ({
               ...lang,
               label: lang.name,
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
}