import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const sizeClasses = {
     xs: "max-w-xs!",
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
     size?: keyof typeof sizeClasses,
     className?: string,
     modal?: boolean
}
export default function AppModal({open, onOpenChange, title, description, children, triggerButton, size="default", className, modal=true}: AppModalProps){
     return (
          <Dialog open={open} onOpenChange={onOpenChange} modal={modal}>
               {triggerButton && (
                    <DialogTrigger asChild>
                         {triggerButton}
                    </DialogTrigger>
               )}
               <DialogContent className={cn(
                    "max-w-[calc(100%-2rem)]",
                    sizeClasses[size],
                    className
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