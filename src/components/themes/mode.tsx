"use client"
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { useAppearance } from "@/context/appearance";
import { THEME_SETTINGS } from "@/lib/constants/settings";
import { useTranslation } from "react-i18next";

export default function ModeToggler(){
     const {t} = useTranslation()
     const {setTheme, resolvedTheme} = useAppearance();
     return (
          <DropdownMenu modal={false}>
               <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" title={t("labels.theme")}>
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
     )
}