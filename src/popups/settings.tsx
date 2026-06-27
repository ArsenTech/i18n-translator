import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
import { SettingsTab } from "@/lib/types/enums";
import { SettingsLoader } from "@/loaders/settings";
import { lazy, Suspense, useMemo } from "react";
import { useTranslation } from "react-i18next";

const SettingsContent = lazy(()=>import("@/contents/settings"))

export default function SettingsPopup({triggerButton}: PopupComponentProps){
     const {t} = useTranslation("settings")
     const settingsTab = useMemo(()=>(localStorage.getItem("settings-tab") as SettingsTab) || "general",[])
     return (
          <AppModal
               title={t("title")}
               triggerButton={triggerButton}
               size="lg"
          >
               <Suspense fallback={<SettingsLoader/>}>
                    <SettingsContent currTab={settingsTab}/>
               </Suspense>
          </AppModal>
     )
}