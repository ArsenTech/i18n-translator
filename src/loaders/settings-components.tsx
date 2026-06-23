import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface SettingsOptionLoaderProps{
     optionType: "switch" | "input" | "selector",
     width?: number
}
export function SettingsOptionLoader({optionType, width}: SettingsOptionLoaderProps){
     return (
          <div className="flex flex-row items-center justify-between w-full">
               <div className="space-y-1 w-full">
                    <Skeleton className="h-3.5 w-2/5"/>
                    <Skeleton className="h-3.5 w-1/4"/>
               </div>
               {optionType==="switch" ? (
                    <Skeleton className="w-8 h-[18px]"/>
               ) : optionType==="input" ? (
                    <Skeleton className="w-1/3 h-8"/>
               ) : (
                    <Skeleton className={cn("h-8", !width && "w-48")} style={{width}}/>
               )}
          </div>
     )
}
interface SettingsItemLoaderProps{
     className?: string,
     children: React.ReactNode,
     includeDescription?: boolean
}
export function SettingsItemLoader({className, children, includeDescription=false}: SettingsItemLoaderProps){
     return (
          <div className="border border-muted flex flex-col gap-4 rounded-xl p-4">
               <Skeleton className="h-4 w-1/3"/>
               {includeDescription && (
                    <Skeleton className="h-3.5 w-1/2"/>
               )}
               <div className={cn("space-y-3",className)}>
                    {children}
               </div>
          </div>
     )
}