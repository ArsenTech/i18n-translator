import AppModal from "@/components/popups/modal";
import { PopupComponentProps } from "@/lib/types";

export default function SettingsPopup({triggerButton}: PopupComponentProps){
     return (
          <AppModal
               title="Settings"
               triggerButton={triggerButton}
               size="lg"
          >
               TODO: Make a settings content
          </AppModal>
     )
}