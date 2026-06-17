import { TriangleAlert, CircleAlert, CheckCircle } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip"

interface StatusCellProps{
     base: string,
     target: string
}
export default function StatusCell({base, target}: StatusCellProps){
     return (
          <Tooltip>
               <TooltipTrigger className="flex justify-center max-w-[50px]">
                    {base===target ? (
                         <TriangleAlert className="size-5 text-amber-600 dark:text-amber-400"/>
                    ) : !target ? (
                         <CircleAlert className="size-5 text-destructive"/>
                    ) : (
                         <CheckCircle className="size-5 text-emerald-600 dark:text-emerald-400" />
                    )}
               </TooltipTrigger>
               <TooltipContent>
                    {base===target
                         ? "Translation is equal to source" : !target
                         ? "Translation is missing" : "Translation is now set"}
               </TooltipContent>
          </Tooltip>
     )
}