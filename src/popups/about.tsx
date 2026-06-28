import AppModal from "@/components/popups/modal";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import type { PopupComponentProps } from "@/lib/types/props";
import { AboutDetailsLoader } from "@/loaders/translator";
import { openUrl } from "@tauri-apps/plugin-opener";
import { Scale, MessageCircleWarning, Grid2X2Plus } from "lucide-react";
import { lazy, Suspense, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { usePopupOpen } from "@/hooks/use-popup-open";

const AboutDetails = lazy(()=>import("@/contents/about-details"));

export default function AboutPopup({triggerButton, modal=true, open, setOpen}: PopupComponentProps){
     const {t} = useTranslation("about")
     const {actualOpen, setActualOpen} = usePopupOpen({open, setOpen})
     const year = new Date().getFullYear()
     const translatedBy = useMemo(()=>t("translated-by"),[t])
     return (
          <AppModal
               title={t("title")}
               triggerButton={triggerButton}
               size="lg"
               modal={modal}
               open={actualOpen}
               onOpenChange={setActualOpen}
          >
               <div className="flex justify-center items-center gap-4">
                    <img alt="i18n-translator" width="100" height="100" className="object-contain" src="/logo.png" />
                    <Suspense fallback={<AboutDetailsLoader/>}>
                         <AboutDetails/>
                    </Suspense>
                    <Button variant="secondary" onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/blob/main/LICENSE")}>
                         <Scale/>
                         {t("licensing")}
                    </Button>
               </div>
               <p>
                    <Trans
                         ns="about"
                         i18nKey="information.line1"
                         components={{
                              bold: <span className="font-semibold"/>
                         }}
                    />
               </p>
               <p>{t("information.line2")}</p>
               <p>
                    <Trans
                         ns="about"
                         i18nKey="information.line3"
                         components={{
                              bold: <span className="font-semibold"/>
                         }}
                    />
               </p>
               <div className="flex items-center justify-between gap-1.5">
                    <p className="text-sm text-muted-foreground">&copy; {year} ArsenTech</p>
                    {translatedBy && (
                         <p className="text-sm">{translatedBy}</p>
                    )}
               </div>
               <DialogFooter>
                    <Button variant="outline" onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/issues/new?assignees=&labels=&template=bug_report.md&title=")}>
                         <MessageCircleWarning className="text-muted-foreground"/>
                         {t("bug-report")}
                    </Button>
                    <Button variant="outline" onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/issues/new?assignees=&labels=&template=feature_request.md&title=")}>
                         <Grid2X2Plus className="text-muted-foreground"/>
                         {t("feature-request")}
                    </Button>
               </DialogFooter>
          </AppModal>
     )
}