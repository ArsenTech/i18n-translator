import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { TranslationFilterType, TranslationSearchType } from "@/lib/types/string-unions";
import { useTranslation } from "react-i18next";

const SEARCH_MODES = ["source", "source-not", "translation", "translation-not", "name", "name-not"] as const;
const FILTERS = ["all", "translated", "untranslated", "transEqSrc", "repeatedStr"] as const

interface FiltersProps {
     filter: TranslationFilterType
     onFilterChange: (filter: TranslationFilterType) => void
     searchMode: TranslationSearchType
     onSearchModeChange: (mode: TranslationSearchType) => void
}
export default function Filters({filter, onFilterChange, onSearchModeChange, searchMode}: FiltersProps){
     const {t} = useTranslation("table")
     return (
          <DropdownMenu>
               <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                         <Filter/>
                         {t("filters.title")}
                    </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-full min-w-56">
                    <DropdownMenuLabel>{t("filters.action")}</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuSub>
                         <DropdownMenuSubTrigger>{t("filters.search")}</DropdownMenuSubTrigger>
                         <DropdownMenuSubContent>
                              <DropdownMenuRadioGroup
                                   value={searchMode}
                                   onValueChange={(value) => onSearchModeChange(value as typeof searchMode)}
                              >
                                   {SEARCH_MODES.map(mode=>(
                                        <DropdownMenuRadioItem value={mode}>
                                             {t(`placeholders.${mode}`)}
                                        </DropdownMenuRadioItem>
                                   ))}
                              </DropdownMenuRadioGroup>
                         </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuRadioGroup
                         value={filter}
                         onValueChange={(value) => onFilterChange(value as TranslationFilterType)}
                    >
                         {FILTERS.map(filter=>(
                              <DropdownMenuRadioItem value={filter}>
                                   {t(`filters.${filter}`)}
                              </DropdownMenuRadioItem>
                         ))}
                    </DropdownMenuRadioGroup>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}