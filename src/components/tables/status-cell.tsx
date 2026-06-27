import { TriangleAlert, CircleAlert, CheckCircle } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip"
import { useTranslation } from "react-i18next"

interface StatusCellProps{
     base: string,
     target: string
}
export default function StatusCell({base, target}: StatusCellProps){
     const {t} = useTranslation("table")
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
                         ? t("status.translation-eq-src") : !target
                         ? t("status.translation-missing") : t("status.translation-set")}
               </TooltipContent>
          </Tooltip>
     )
}