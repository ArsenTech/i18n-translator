import { type Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
     if (!column.getCanSort()) {
          return <div className={cn("select-none pointer-events-none",className)}>{title}</div>
     }
     return (
          <div className={cn("flex items-center gap-1", className)}>
               <div className="select-none pointer-events-none">{title}</div>
               <Button
                    variant="ghost"
                    size="icon-sm"
                    className="data-[state=open]:bg-accent"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               >
                    {column.getIsSorted() === "desc" ? (
                         <ArrowDown />
                    ) : column.getIsSorted() === "asc" ? (
                         <ArrowUp />
                    ) : (
                         <ChevronsUpDown />
                    )}
               </Button>
          </div>
     )
}