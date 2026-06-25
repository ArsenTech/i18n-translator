import AppModal from "@/components/popups/modal";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import type { PopupComponentProps } from "@/lib/types/props";
import { AboutDetailsLoader } from "@/loaders/translator";
import { openUrl } from "@tauri-apps/plugin-opener";
import { Scale, MessageCircleWarning, Grid2X2Plus } from "lucide-react";
import { lazy, Suspense } from "react";

const AboutDetails = lazy(()=>import("@/contents/about-details"));

export default function AboutPopup({triggerButton}: PopupComponentProps){
     const year = new Date().getFullYear()
     const translatedBy = "Translated by ArsenTech"
     return (
          <AppModal
               title="About I18N Translator"
               triggerButton={triggerButton}
               size="lg"
          >
               <div className="flex justify-center items-center gap-4">
                    <img alt="i18n-translator" width="100" height="100" className="object-contain" src="/logo.png" />
                    <Suspense fallback={<AboutDetailsLoader/>}>
                         <AboutDetails/>
                    </Suspense>
                    <Button variant="secondary" onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/blob/main/LICENSE")}>
                         <Scale/>
                         Licensing info
                    </Button>
               </div>
               <p><span className="font-semibold">I18N Translator</span> is a desktop localization tool designed to help translators and developers create, edit, and maintain application translations in multiple file formats.</p>
               <p>It provides a simple spreadsheet-like interface for editing translation keys while preserving the original file structure whenever possible.</p>
               <p>Whether you are translating a small application or maintaining a large localization project, <span className="font-semibold">I18N Translator</span> aims to provide a fast and straightforward workflow.</p>
               <div className="flex items-center justify-between gap-1.5">
                    <p className="text-sm text-muted-foreground">&copy; {year} ArsenTech</p>
                    {translatedBy && (
                         <p className="text-sm">{translatedBy}</p>
                    )}
               </div>
               <DialogFooter>
                    <Button variant="outline" onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/issues/new?assignees=&labels=&template=bug_report.md&title=")}>
                         <MessageCircleWarning className="text-muted-foreground"/>
                         Report a bug
                    </Button>
                    <Button variant="outline" onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/issues/new?assignees=&labels=&template=feature_request.md&title=")}>
                         <Grid2X2Plus className="text-muted-foreground"/>
                         Request a feature
                    </Button>
               </DialogFooter>
          </AppModal>
     )
}