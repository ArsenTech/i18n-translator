import AppModal from "@/components/popups/modal";
import { PopupComponentProps } from "@/lib/types";

export default function AboutPopup({triggerButton}: PopupComponentProps){
     return (
          <AppModal
               title="About I18N Translator"
               triggerButton={triggerButton}
          >
               TODO: Make an about content
          </AppModal>
     )
}