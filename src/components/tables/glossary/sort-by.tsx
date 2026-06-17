import React from "react"
import { ArrowDownUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuRadioGroup,
     DropdownMenuRadioItem,
     DropdownMenuSeparator,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SortByProps {
     onSort: (column: string | null, desc?: boolean) => void
}

export default function SortBy({ onSort }: SortByProps) {
     const [column, setColumn] = React.useState("")
     const [direction, setDirection] = React.useState<"asc" | "desc">("asc")
     const handleSort = (
          nextColumn: string,
          nextDirection: "asc" | "desc" = direction
     ) => {
          setColumn(nextColumn)
          setDirection(nextDirection)
          if (!nextColumn) {
               onSort(null)
               return
          }
          onSort(nextColumn, nextDirection === "desc")
     }
     return (
          <DropdownMenu>
               <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                         <ArrowDownUp />
                         Sort By
                    </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="min-w-56">
                    <DropdownMenuRadioGroup
                         value={column}
                         onValueChange={(value) => handleSort(value)}
                    >
                         <DropdownMenuRadioItem value="">
                              Default
                         </DropdownMenuRadioItem>
                         <DropdownMenuRadioItem value="termWords">
                              Term words Count
                         </DropdownMenuRadioItem>
                         <DropdownMenuRadioItem value="termChars">
                              Term characters Count
                         </DropdownMenuRadioItem>
                         <DropdownMenuRadioItem value="translationWords">
                              Translation Words Count
                         </DropdownMenuRadioItem>
                         <DropdownMenuRadioItem value="translationChars">
                              Translation Characters Count
                         </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                         value={direction}
                         onValueChange={(value) =>
                              handleSort(
                                   column,
                                   value as "asc" | "desc"
                              )
                         }
                    >
                         <DropdownMenuRadioItem value="asc">
                              Ascending
                         </DropdownMenuRadioItem>
                         <DropdownMenuRadioItem value="desc">
                              Descending
                         </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}