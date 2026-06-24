"use client"
import { ButtonGroup } from "@/components/ui/button-group";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { useAppearance } from "@/context/appearance";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { AVAILABLE_COLORS, THEME_SETTINGS } from "@/lib/settings/constants";
import { cn } from "@/lib/utils";
import { Color } from "@/lib/settings/types";

export default function ThemeToggler(){
     const {setTheme, resolvedTheme, color, setColor} = useAppearance();
     return (
          <ButtonGroup>
               <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                         <Button variant="outline" size="icon">
                              {resolvedTheme==="dark" ? <Moon/> : <Sun/>}
                         </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="[--radius:0.65rem]" align="end">
                         {THEME_SETTINGS.map(({theme, Icon})=>(
                              <DropdownMenuItem key={theme} onClick={()=>setTheme(theme)}>
                                   <Icon className="text-muted-foreground"/>
                                   {theme}
                              </DropdownMenuItem>
                         ))}
                    </DropdownMenuContent>
               </DropdownMenu>
               <Select
                    onValueChange={color=>setColor(color as Color)}
                    value={color}
               >
                    <SelectTrigger>
                         <SelectValue placeholder="Choose a Color"/>
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
          </ButtonGroup>
     )
}