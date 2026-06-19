import AppModal from "@/components/popups/modal";
import { PopupComponentProps } from "@/lib/types";
import { AddToGlossaryLoader } from "@/loaders/contents/form";
import { lazy, Suspense } from "react";

const AddToGlossary = lazy(()=>import("@/contents/add-to-glossary"));

export default function AddToGlossaryPopup({triggerButton}: PopupComponentProps){
     return (
          <AppModal
               title="Add To Glossary"
               description="Add the term you're looking for to the glossary"
               triggerButton={triggerButton}
          >
               <Suspense fallback={<AddToGlossaryLoader/>}>
                    <AddToGlossary/>
               </Suspense>
          </AppModal>
     )
}