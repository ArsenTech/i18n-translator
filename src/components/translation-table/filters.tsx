import { Filter } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { FilterType } from ".";

interface FiltersProps {
     filter: FilterType
     onFilterChange: (filter: FilterType) => void
     searchMode: "key" | "translation" | "source" | "source-not" | "translation-not" | "key-not"
     onSearchModeChange: (mode: "key" | "translation" | "source" | "source-not" | "translation-not" | "key-not") => void
}
export default function Filters({filter, onFilterChange, onSearchModeChange, searchMode}: FiltersProps){
     return (
          <DropdownMenu>
               <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                         <Filter/>
                         Filters
                    </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-full min-w-56">
                    <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuSub>
                         <DropdownMenuSubTrigger>Search</DropdownMenuSubTrigger>
                         <DropdownMenuSubContent>
                              <DropdownMenuRadioGroup
                                   value={searchMode}
                                   onValueChange={(value) => onSearchModeChange(value as typeof searchMode)}
                              >
                                   <DropdownMenuRadioItem value="source">Search by Source</DropdownMenuRadioItem>
                                   <DropdownMenuRadioItem value="source-not">Source doesn't contain</DropdownMenuRadioItem>
                                   <DropdownMenuRadioItem value="translation">Search by Translation</DropdownMenuRadioItem>
                                   <DropdownMenuRadioItem value="translation-not">Translation doesn't contain</DropdownMenuRadioItem>
                                   <DropdownMenuRadioItem value="key">Search by Key</DropdownMenuRadioItem>
                                   <DropdownMenuRadioItem value="key-not">Key doesn't contain</DropdownMenuRadioItem>
                              </DropdownMenuRadioGroup>
                         </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuRadioGroup
                         value={filter}
                         onValueChange={(value) => onFilterChange(value as FilterType)}
                    >
                         <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                         <DropdownMenuRadioItem value="translated">Translated</DropdownMenuRadioItem>
                         <DropdownMenuRadioItem value="untranslated">Untranslated</DropdownMenuRadioItem>
                         <DropdownMenuRadioItem value="transEqSrc">Translation equals Source</DropdownMenuRadioItem>
                         <DropdownMenuRadioItem value="repeatedStr">Repeated Strings</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}