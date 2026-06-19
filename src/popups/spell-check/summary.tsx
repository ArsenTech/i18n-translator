import AppModal from "@/components/popups/modal";
import { PopupComponentProps } from "@/lib/types";
import { SpellCheckSummaryLoader } from "@/loaders/contents/spell-check";
import { lazy, Suspense } from "react";

const SpellCheckSummary = lazy(()=>import("@/contents/spell-check/summary"));

export default function SpellCheckSummaryPopup({open, setOpen}: PopupComponentProps){
     return (
          <AppModal
               size="sm"
               title="Spell Check Summary"
               open={open}
               onOpenChange={setOpen}
          >
               <Suspense fallback={<SpellCheckSummaryLoader/>}>
                    <SpellCheckSummary/>
               </Suspense>
          </AppModal>
     )
}