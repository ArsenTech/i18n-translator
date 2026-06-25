import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { cn } from "@/lib/utils";
import type { DesignType } from "@/lib/types/string-unions";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

interface Props{
     Icon?: LucideIcon | IconType,
     title: string,
     children: React.ReactNode,
     className?: string,
     description?: string,
     type?: DesignType
}
export default function SettingsItem({children, Icon, title, className, description, type="default"}: Props){
     return (
          <Card className={cn("shadow-xs ring-0 border",type==="danger" && "border-destructive shadow-destructive/50")}>
               <CardHeader>
                    <div className="space-y-2 w-full">
                         <CardTitle className="flex items-center gap-2">
                              {Icon && <Icon className="size-4.5 text-muted-foreground"/>}
                              {title}
                         </CardTitle>
                         {!!description && (
                              <CardDescription>{description}</CardDescription>
                         )}
                    </div>
               </CardHeader>
               <CardContent className={cn("space-y-4",className)}>
                    {children}
               </CardContent>
          </Card>
     )
}