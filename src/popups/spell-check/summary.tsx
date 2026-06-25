import AppModal from "@/components/popups/modal";
import type { PopupComponentProps } from "@/lib/types/props";
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