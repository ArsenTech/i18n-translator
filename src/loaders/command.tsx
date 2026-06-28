import { Skeleton } from "@/components/ui/skeleton";

export default function CommandsLoader(){
     return (
          <div className="flex flex-col overflow-hidden! rounded-xl! bg-popover p-1 text-popover-foreground max-h-[332px]">
               <div className="p-1 pb-0">
                    <Skeleton className="h-8 w-full rounded-lg ps-2"/>
               </div>
               <div className="overflow-hidden! text-foreground px-2 py-1.5">
                    <Skeleton className="h-3.5 w-16 mb-1.5"/>
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
               </div>
               <div className="-mx-1 h-px bg-muted animate-pulse"/>
               <div className="overflow-hidden! text-foreground px-2 py-1.5">
                    <Skeleton className="h-3.5 w-16 mb-1.5"/>
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
               </div>
               <div className="-mx-1 h-px bg-muted animate-pulse"/>
               <div className="overflow-hidden! text-foreground px-2 py-1.5">
                    <Skeleton className="h-3.5 w-16 mb-1.5"/>
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
               </div>
               <div className="-mx-1 h-px bg-muted animate-pulse"/>
               <div className="overflow-hidden! text-foreground px-2 py-1.5">
                    <Skeleton className="h-3.5 w-16 mb-1.5"/>
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
                    <Skeleton className="h-8 w-full"/>
               </div>
          </div>
     )
}