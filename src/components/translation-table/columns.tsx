import type { ITranslation } from "@/lib/types/data"
import { ColumnDef } from "@tanstack/react-table"
import { CheckCircle, CircleAlert, TriangleAlert } from "lucide-react"
import { DataTableColumnHeader } from "./col-header"
import { wordCount } from "@/lib/helpers"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export const getColumns = (isSelected: boolean): ColumnDef<ITranslation>[] => [
     {
          accessorKey: "keyName",
          header: ({column})=>(
               <DataTableColumnHeader title="Name" column={column}/>
          ),
          size: 200,
          maxSize: 200,
          cell: ({getValue}) => {
               const array = getValue<string>().split(".");
               return (
                    <div className="truncate font-mono max-w-[200px]">
                         {isSelected ? array[array.length-1] : getValue<string>()}
                    </div>
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
               <Tooltip>
                    <TooltipTrigger className="flex justify-center max-w-[60px]">
                         {row.original.baseString===row.original.translationString ? (
                              <TriangleAlert className="size-5 text-amber-600 dark:text-amber-400"/>
                         ) : !row.original.translationString ? (
                              <CircleAlert className="size-5 text-destructive"/>
                         ) : (
                              <CheckCircle className="size-5 text-emerald-600 dark:text-emerald-400" />
                         )}
                    </TooltipTrigger>
                    <TooltipContent>
                         {row.original.baseString===row.original.translationString
                              ? "Translation is equal to source" : !row.original.translationString
                              ? "Translation is missing" : "Translation is now set"}
                    </TooltipContent>
               </Tooltip>
          ),
          size: 60,
          maxSize: 60,
     }
]