import { LucideIcon } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { ButtonProps } from "../ui/button";

type AppConfirmationProps = Pick<ButtonProps,"variant"> & {
     open?: boolean
     onOpenChange?: (open: boolean) => void
     Icon?: LucideIcon
     title: string
     description?: string
     actionText?: string
     onConfirm: () => void,
     triggerButton?: React.ReactNode
}
export function AppConfirmation({open, onOpenChange, Icon, title, description, actionText="Continue", onConfirm, variant="default", triggerButton}: AppConfirmationProps){
     return (
          <AlertDialog open={open} onOpenChange={onOpenChange}>
               {triggerButton && (
                    <AlertDialogTrigger asChild>
                         {triggerButton}
                    </AlertDialogTrigger>
               )}
               <AlertDialogContent>
                    <AlertDialogHeader>
                         {Icon && (
                              <AlertDialogMedia>
                                   <Icon />
                              </AlertDialogMedia>
                         )}
                         <AlertDialogTitle>{title}</AlertDialogTitle>
                         {description && (
                              <AlertDialogDescription>{description}</AlertDialogDescription>
                         )}
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                         <AlertDialogCancel>Cancel</AlertDialogCancel>
                         <AlertDialogAction variant={variant} onClick={onConfirm}>{actionText}</AlertDialogAction>
                    </AlertDialogFooter>
               </AlertDialogContent>
          </AlertDialog>
     )
}