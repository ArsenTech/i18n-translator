import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { cn } from "@/lib/utils";
import { DesignType } from "@/lib/types";
import { LucideIcon } from "lucide-react";

interface Props{
     Icon?: LucideIcon,
     title: string,
     children: React.ReactNode,
     className?: string,
     description?: string,
     button?: React.JSX.Element,
     type?: DesignType
}
export default function SettingsItem({children, Icon, title, className, description, button, type="default"}: Props){
     return (
          <Card className={cn("shadow-xs ring-0 border",type==="danger" && "border-destructive shadow-destructive/50")}>
               <CardHeader>
                    <div className="flex items-between justify-center gap-2 w-full">
                         <div className="space-y-2 w-full">
                              <CardTitle className="flex items-center gap-2">
                                   {Icon && <Icon className="size-4.5 text-muted-foreground"/>}
                                   {title}
                              </CardTitle>
                              {!!description && (
                                   <CardDescription>{description}</CardDescription>
                              )}
                         </div>
                         {button}
                    </div>
               </CardHeader>
               <CardContent className={cn("space-y-3",className)}>
                    {children}
               </CardContent>
          </Card>
     )
}