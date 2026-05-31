import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface AppModalProps {
     open?: boolean
     onOpenChange?: (open: boolean) => void
     title: string
     description?: string
     children: React.ReactNode,
     triggerButton?: React.ReactNode
}
export default function AppModal({open, onOpenChange, title, description, children, triggerButton}: AppModalProps){
     return (
          <Dialog open={open} onOpenChange={onOpenChange}>
               {triggerButton && (
                    <DialogTrigger asChild>
                         {triggerButton}
                    </DialogTrigger>
               )}
               <DialogContent>
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