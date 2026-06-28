"use client"
import { useAppearance } from "@/context/appearance";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { AVAILABLE_COLORS } from "@/lib/constants/settings";
import { cn } from "@/lib/utils";
import type { Color } from "@/lib/types/settings";
import { useTranslation } from "react-i18next";

export default function ColorChanger(){
     const {t} = useTranslation("translation",{
          keyPrefix: "labels"
     })
     const {resolvedTheme, color, setColor} = useAppearance();
     return (
          <Select
               onValueChange={color=>setColor(color as Color)}
               value={color}
          >
               <SelectTrigger>
                    <SelectValue placeholder={t("color")}/>
               </SelectTrigger>
               <SelectContent>
                    {Object.entries(AVAILABLE_COLORS).map(([key,color])=>(
                         <SelectItem key={key} value={key}>
                              <div className="flex items-center justify-center flex-wrap gap-2 ">
                                   <div
                                        className={cn(
                                             "rounded-full",
                                             "size-3",
                                             resolvedTheme==="light" ? color.light : color.dark
                                        )}
                                   />
                                   <div className="text-sm">{color.title}</div>
                              </div>
                         </SelectItem>
                    ))}
               </SelectContent>
          </Select>
     )
}