import type { GlossaryEntry } from "@/lib/types/data"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../col-header"
import { wordCount } from "@/lib/helpers"
import { Switch } from "@/components/ui/switch"
import { useGlossary } from "@/context/glossary"
import { useAppTranslation } from "@/context/translation"
import GlossaryActions from "@/lib/store/glossary"
import { AppConfirmation } from "@/components/popups/confirmation"
import { Button } from "@/components/ui/button"
import { BookOpen, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/utils"
import { lazy, Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

const StatusCell = lazy(()=>import("../status-cell"))

export const GLOSSARY_COLS: ColumnDef<GlossaryEntry>[] = [
     {
          accessorKey: "term",
          header: ({column})=>(
               <DataTableColumnHeader title="Term" column={column}/>
          ),
          size: 200,
          maxSize: 200,
          cell: ({getValue}) => (
               <div className="break-all whitespace-normal max-w-[400px]">
                    {getValue<string>()}
               </div>
          )
     },
     {
          accessorKey: "translation",
          header: ({column})=>(
               <DataTableColumnHeader title="Translation" column={column}/>
          ),
          size: 200,
          maxSize: 200,
          cell: ({getValue}) => (
               <div className="break-all whitespace-normal max-w-[400px]">
                    {getValue<string>()}
               </div>
          )
     },
     {
          accessorKey: "caseSensitive",
          header: "Case Sensitive",
          cell: ({getValue, row}) => {
               const {setGlossary, glossary} = useGlossary()
               const {langs} = useAppTranslation()
               const updateValue = (checked: boolean) => {
                    const newValue = [...glossary].map((item,i)=>{
                         const newItem: GlossaryEntry = {...item, caseSensitive: checked};
                         return i===row.index ? newItem : item
                    })
                    setGlossary(newValue)
                    GlossaryActions.setGlossary(langs, newValue)
               }
               return (
                    <div className="break-all whitespace-normal max-w-[32px]">
                         <Switch
                              checked={getValue<boolean>()}
                              onCheckedChange={updateValue}
                         />
                    </div>
               )
          },
          size: 32,
          maxSize: 32
     },
     {
          id: "termChars",
          accessorFn: (row) => row.term.trim().length,
          enableHiding: true,
     },
     {
          id: "termWords",
          accessorFn: (row) => wordCount(row.term),
          enableHiding: true,
     },
     {
          id: "translationChars",
          accessorFn: (row) => row.translation.trim().length,
          enableHiding: true,
     },
     {
          id: "translationWords",
          accessorFn: (row) => wordCount(row.translation),
          enableHiding: true,
     },
     {
          id: "status",
          header: "Status",
          cell: ({row}) => (
               <Suspense fallback={<Skeleton className="size-5"/>}>
                    <StatusCell
                         base={row.original.term}
                         target={row.original.translation}
                    />
               </Suspense>
          ),
          size: 50,
          maxSize: 50,
     },
     {
          id: "actions",
          cell: ({row}) => {
               const {setGlossary, glossary} = useGlossary()
               const {langs} = useAppTranslation()
               const deleteValue = () => {
                    try {
                         const newValue = [...glossary].filter((_,i)=>i!==row.index)
                         setGlossary(newValue)
                         GlossaryActions.setGlossary(langs, newValue)
                         toast.success("Glossary entry deleted successfully")
                    } catch (err) {
                         toast.error("Failed to delete the glossary entry",{
                              description: getErrorMessage(err)
                         })
                    }
               }
               return (
                    <AppConfirmation
                         title="Are you sure you want to delete this glossary entry?"
                         description="This action cannot be undone"
                         Icon={BookOpen}
                         variant="destructive"
                         actionText="Delete"
                         onConfirm={deleteValue}
                         triggerButton={(
                              <Button variant="destructive" size="icon" title="Delete Entry">
                                   <Trash2/>
                              </Button>
                         )}
                    />
               )
          },
          size: 50,
          maxSize: 50,
     }
]