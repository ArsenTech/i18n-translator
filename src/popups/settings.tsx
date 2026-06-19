import AppModal from "@/components/popups/modal";
import { PopupComponentProps } from "@/lib/types";
import { SettingsTab } from "@/lib/types/enums";
import { SettingsLoader } from "@/loaders/settings";
import { lazy, Suspense, useMemo } from "react";

const SettingsContent = lazy(()=>import("@/contents/settings"))

export default function SettingsPopup({triggerButton}: PopupComponentProps){
     const settingsTab = useMemo(()=>(localStorage.getItem("settings-tab") as SettingsTab) || "general",[])
     return (
          <AppModal
               title="Settings"
               triggerButton={triggerButton}
               size="lg"
          >
               <Suspense fallback={<SettingsLoader/>}>
                    <SettingsContent currTab={settingsTab}/>
               </Suspense>
          </AppModal>
     )
}