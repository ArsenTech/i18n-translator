import type { ITranslation } from "@/lib/types/data"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../col-header"
import { wordCount } from "@/lib/helpers"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { lazy, Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

const StatusCell = lazy(()=>import("../status-cell"))

export const getColumns = (isSelected: boolean): ColumnDef<ITranslation>[] => [
     {
          accessorKey: "keyName",
          header: ({column})=>(
               <DataTableColumnHeader title="Name" column={column}/>
          ),
          size: 150,
          maxSize: 150,
          cell: ({getValue}) => {
               const array = getValue<string>().split(".");
               return (
                    <Tooltip>
                         <TooltipTrigger className="truncate font-mono max-w-[150px]">
                              {isSelected ? array[array.length-1] : getValue<string>()}
                         </TooltipTrigger>
                         <TooltipContent className="font-mono">{getValue<string>()}</TooltipContent>
                    </Tooltip>
               )
          }
     },
     {
          accessorKey: "baseString",
          header: ({column})=>(
               <DataTableColumnHeader title="Source" column={column}/>
          ),
          size: 400,
          maxSize: 400,
          cell: ({getValue}) => (
               <div className="break-all whitespace-normal max-w-[400px]">
                    {getValue<string>()}
               </div>
          )
     },
     {
          accessorKey: "translationString",
          header: ({column})=>(
               <DataTableColumnHeader title="Translation" column={column}/>
          ),
          size: 400,
          maxSize: 400,
          cell: ({getValue}) => (
               <div className="break-all whitespace-normal max-w-[400px]">
                    {getValue<string>()}
               </div>
          )
     },
     {
          id: "baseChars",
          accessorFn: (row) => row.baseString.trim().length,
          enableHiding: true,
     },
     {
          id: "baseWords",
          accessorFn: (row) => wordCount(row.baseString),
          enableHiding: true,
     },
     {
          id: "translationChars",
          accessorFn: (row) => row.translationString.trim().length,
          enableHiding: true,
     },
     {
          id: "translationWords",
          accessorFn: (row) => wordCount(row.translationString),
          enableHiding: true,
     },
     {
          id: "status",
          header: "Status",
          cell: ({row}) => (
               <Suspense fallback={<Skeleton className="size-5"/>}>
                    <StatusCell
                         base={row.original.baseString}
                         target={row.original.translationString}
                    />
               </Suspense>
          ),
          size: 50,
          maxSize: 50,
     }
]