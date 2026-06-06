import { ILangItem } from "@/lib/types/data";
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
}