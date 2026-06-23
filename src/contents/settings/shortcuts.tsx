import { TableLoader } from "@/loaders/translator"
import { lazy, Suspense } from "react"

const ShortcutsTable = lazy(()=>import("@/components/tables/shortcuts"))

export default function ShortcutSettings(){
     return (
          <div className="space-y-2">
               <Suspense fallback={<TableLoader rows={10} cols={[50,100]}/>}>
                    <ShortcutsTable/>
               </Suspense>
          </div>
     )
}