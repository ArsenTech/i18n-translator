import { Skeleton } from "../ui/skeleton";

export default function TitlebarLoader(){
     return (
          <div className="flex items-center justify-between gap-2 border-b shadow-xs pl-2 sticky top-0 left-0 z-20 w-full h-9 backdrop-blur-md">
               <div className="flex items-center gap-2 w-full">
                    <Skeleton className="size-6 rounded-full"/>
                    <div className="flex items-center gap-0.5 p-[3px] h-full border-0 bg-transparent shadow-none rounded-none">
                         <Skeleton className="h-6 w-[34px]"/>
                         <Skeleton className="h-6 w-9"/>
                         <Skeleton className="h-6 w-[44px]"/>
                         <Skeleton className="h-6 w-[46px]"/>
                    </div>
               </div>
               <div
                    data-tauri-drag-region
                    className="flex-1 h-full"
               />
               <div className="flex items-stretch">
                    <Skeleton className="size-9"/>
                    <Skeleton className="size-9"/>
                    <Skeleton className="size-9"/>
               </div>
          </div>
     )
}