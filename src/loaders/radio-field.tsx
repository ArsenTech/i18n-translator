import { Skeleton } from "@/components/ui/skeleton";

interface RadioFieldLoaderProps{
     length: number
}
export default function RadioFieldLoader({length}: RadioFieldLoaderProps){
     return (
          <div className="grid w-full gap-2">
               {Array.from({length}).map((_,i) => (
                    <div key={i+1} className="flex items-center gap-3">
                         <Skeleton className="size-4 rounded-full"/>
                         <Skeleton className="h-4 w-3/4"/>
                    </div>
               ))}
          </div>
     )
}