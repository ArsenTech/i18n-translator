import { CircleQuestionMark } from "lucide-react"
import { Label } from "../ui/label"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface Props{
     title: string,
     description?: string,
     children: React.ReactNode,
     tooltip?: string,
     id?: string
}
export default function SettingsOption({title, description, children, tooltip, id}: Props){
     return (
          <div className="flex flex-row items-center justify-between">
               <div className="space-y-1 flex-1">
                    <Label htmlFor={id} className="flex items-center gap-2">
                         {title}
                         {tooltip && (
                              <Tooltip>
                                   <TooltipTrigger>
                                        <CircleQuestionMark className="size-4 text-muted-foreground"/>
                                   </TooltipTrigger>
                                   <TooltipContent>
                                        {tooltip}
                                   </TooltipContent>
                              </Tooltip>
                         )}
                    </Label>
                    {description && (
                         <p className="text-muted-foreground text-sm">{description}</p>
                    )}
               </div>
               {children}
          </div>
     )
}