import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { BrightnessSliderLoader } from "./fields"

interface SettingsOptionLoaderProps{
     optionType: "switch" | "input" | "selector" | "brightness",
     width?: number,
     noDescription?: boolean,
     includeIcon?: boolean
}
export function SettingsOptionLoader({optionType, width, noDescription=false, includeIcon=false}: SettingsOptionLoaderProps){
     return (
          <div className="flex flex-row items-center justify-between w-full">
               <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                         {includeIcon && <Skeleton className="size-5"/>}
                         <Skeleton className="h-4 w-2/5"/>
                    </div>
                    {!noDescription && <Skeleton className="h-4 w-1/4"/>}
               </div>
               {optionType==="switch" ? (
                    <Skeleton className="w-8 h-[18px]"/>
               ) : optionType==="input" ? (
                    <Skeleton className="w-1/3 h-8"/>
               ) : optionType==="brightness" ? (
                    <BrightnessSliderLoader/>
               ) : (
                    <Skeleton className={cn("h-8", !width && "w-48")} style={{width}}/>
               )}
          </div>
     )
}
interface SettingsItemLoaderProps{
     className?: string,
     children: React.ReactNode,
     includeDescription?: boolean,
     includeIcon?: boolean
}
export function SettingsItemLoader({className, children, includeDescription=false, includeIcon=false}: SettingsItemLoaderProps){
     return (
          <div className="border border-muted flex flex-col gap-4 overflow-hidden rounded-xl py-4 px-3.5 bg-card">
               <div className="rounded-t-xl">
                    <div className="space-y-2 w-full">
                         <div className="flex items-center gap-2">
                              {includeIcon && <Skeleton className="size-4.5"/>}
                              <Skeleton className="h-5 w-1/3"/>
                         </div>
                         {includeDescription && (
                              <Skeleton className="h-4 w-1/2"/>
                         )}
                    </div>
               </div>
               <div className={cn("space-y-4",className)}>
                    {children}
               </div>
          </div>
     )
}