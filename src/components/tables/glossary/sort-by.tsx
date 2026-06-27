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
import { useTranslation } from "react-i18next"

interface SortByProps {
     onSort: (column: string | null, desc?: boolean) => void
}

const SORT_OPTIONS = ["termWords", "termChars", "translationWords", "translationChars"] as const

export default function SortBy({ onSort }: SortByProps) {
     const {t} = useTranslation("table")
     const [column, setColumn] = React.useState("")
     const [direction, setDirection] = React.useState<"asc" | "desc">("asc")
     const handleSort = (nextColumn: string, nextDirection: "asc" | "desc" = direction) => {
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
                         {t("sort.title")}
                    </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="min-w-56">
                    <DropdownMenuRadioGroup
                         value={column}
                         onValueChange={(value) => handleSort(value)}
                    >
                         <DropdownMenuRadioItem value="">
                              {t("sort.default")}
                         </DropdownMenuRadioItem>
                         {SORT_OPTIONS.map(option=>(
                              <DropdownMenuRadioItem value={option}>
                                   {t(`sort.${option}`)}
                              </DropdownMenuRadioItem>
                         ))}
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
                              {t("sort.directions.asc")}
                         </DropdownMenuRadioItem>
                         <DropdownMenuRadioItem value="desc">
                              {t("sort.directions.desc")}
                         </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}