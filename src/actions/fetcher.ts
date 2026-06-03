import { cache } from "react";

export default class FetcherActions{
     public static fetchLanguages = cache(async()=>{
          const res = await fetch("/lang-list.json");
          if (!res.ok) throw new Error("Failed to fetch the data")
          const resData: {
               flag: string,
               name: string,
               code: string,
               type: "country" | "language"
          }[] = await res.json();
          return resData.sort(({name: a},{name: b})=>a>b ? 1 : a<b ? -1 : 0)
     })
}