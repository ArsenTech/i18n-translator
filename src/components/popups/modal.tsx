import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

const sizeClasses = {
     sm: "max-w-sm!",
     default: "max-w-md!",
     lg: "max-w-2xl!",
     xl: "max-w-5xl!",
}

interface AppModalProps {
     open?: boolean
     onOpenChange?: (open: boolean) => void
     title: string
     description?: string
     children: React.ReactNode,
     triggerButton?: React.ReactNode,
     size?: "default" | "sm" | "lg" | "xl"
}
export default function AppModal({open, onOpenChange, title, description, children, triggerButton, size="default"}: AppModalProps){
     return (
          <Dialog open={open} onOpenChange={onOpenChange}>
               {triggerButton && (
                    <DialogTrigger asChild>
                         {triggerButton}
                    </DialogTrigger>
               )}
               <DialogContent className={cn(
                    "max-w-[calc(100%-2rem)]",
                    sizeClasses[size]
               )}>
                    <DialogHeader>
                         <DialogTitle>{title}</DialogTitle>
                         {description && (
                              <DialogDescription>{description}</DialogDescription>
                         )}
                    </DialogHeader>
                    {children}
               </DialogContent>
          </Dialog>
     )
}