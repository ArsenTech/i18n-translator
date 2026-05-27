import { Skeleton } from "../ui/skeleton";

export default function QuickAccessToolbarLoader(){
     return (
          <div className="py-2 gap-1 flex items-center justify-center flex-wrap">
               {Array.from({length: 7}).map((_,i)=>(
                    <Skeleton className="h-8 flex-1 aspect-square" key={i+1}/>
               ))}
          </div>
     )
}