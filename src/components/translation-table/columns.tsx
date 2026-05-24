import { ITranslation } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { CheckCircle } from "lucide-react"

export const columns: ColumnDef<ITranslation>[] = [
     {
          accessorKey: "keyName",
          header: "Name",
          size: 250,
          cell: ({getValue}) => (
               <div className="truncate">
                    {getValue<string>()}
               </div>
          )
     },
     {
          accessorKey: "baseString",
          header: "Base Language",
          size: 300,
          cell: ({getValue}) => (
               <div className="truncate">
                    {getValue<string>()}
               </div>
          )
     },
     {
          accessorKey: "translationString",
          header: "Translation",
          size: 300,
          cell: ({getValue}) => (
               <div className="truncate">
                    {getValue<string>()}
               </div>
          )
     },
     {
          id: "status",
          header: "Status",
          cell: () => (
               <div className="flex justify-center">
                    <CheckCircle className="size-5 text-emerald-600 dark:text-emerald-400" />
               </div>
          ),
          size: 60,
          maxSize: 60,
     }
]