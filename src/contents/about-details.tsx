import { Skeleton } from "@/components/ui/skeleton"
import {getName, getTauriVersion, getVersion, getIdentifier} from "@tauri-apps/api/app"
import { cache, useEffect, useState } from "react"

const fetchData = cache(async() => {
     const [name, version, tauri, identifier] = await Promise.all([
          getName(),
          getVersion(),
          getTauriVersion(),
          getIdentifier()
     ])
     return {name, version, tauri, identifier}
})

export default function AboutDetails(){
     const [details, setDetails] = useState(()=>({
          name: localStorage.getItem("app-name"),
          version: localStorage.getItem("app-version"),
          tauri: localStorage.getItem("tauri-version"),
          identifier: localStorage.getItem("app-identifier")
     }))
     useEffect(()=>{
          const getDetails = async() => {
               const fetched = await fetchData();
               setDetails(fetched)
          }
          getDetails()
     },[])
     return (
          <div className="space-y-0.5 w-full">
               {details.name ? (
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">{details.name}</h2>
               ) : (
                    <Skeleton className="h-5 md:h-6 lg:h-8 w-full max-w-64"/>
               )}
               {details.version ? (
                    <p className="text-sm md:text-base lg:text-lg font-semibold">Version {details.version}</p>
               ) : (
                    <Skeleton className="h-4 md:h-5 lg:h-6 w-full max-w-[100px]"/>
               )}
               {details.tauri ? (
                    <p className="text-xs sm:text-sm text-muted-foreground">Tauri version: {details.tauri}</p>
               ) : (
                    <Skeleton className="h-3 sm:h-4 w-1/3"/>
               )}
               {details.identifier ? (
                    <p className="text-xs sm:text-sm text-muted-foreground">Identifier: {details.identifier}</p>
               ) : (
                    <Skeleton className="h-3 sm:h-4 w-full max-w-64"/>
               )}
          </div>
     )
}