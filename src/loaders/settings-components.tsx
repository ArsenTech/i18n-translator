import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface SettingsOptionLoaderProps{
     optionType: "switch" | "input" | "choice" | "radio",
     width?: number,
     length: number
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
                    <Skeleton className="w-1/3 h-9"/>
               ) : (
                    <Skeleton className={cn("h-9", !width && "w-48")} style={{width}}/>
               )}
          </div>
     )
}
interface SettingsItemLoaderProps{
     className?: string,
     children: React.ReactNode,
     noDescription?: boolean
}
export function SettingsItemLoader({className, children, noDescription=false}: SettingsItemLoaderProps){
     return (
          <div className="border border-accent flex flex-col gap-6 rounded-xl p-6">
               <div className="h-4 bg-accent rounded-md w-1/3"/>
               {!noDescription && (
                    <div className="h-3.5 bg-accent rounded-md w-1/2"/>
               )}
               {!className ? children : (
                    <div className={className}>
                         {children}
                    </div>
               )}
          </div>
     )
}