import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { GlossaryFilterType, GlossarySearchType } from ".";

interface FiltersProps {
     filter: GlossaryFilterType
     onFilterChange: (filter: GlossaryFilterType) => void
     searchMode: GlossarySearchType
     onSearchModeChange: (mode: GlossarySearchType) => void
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
                                   <DropdownMenuRadioItem value="term">Search by the term</DropdownMenuRadioItem>
                                   <DropdownMenuRadioItem value="term-not">Term doesn't contain</DropdownMenuRadioItem>
                                   <DropdownMenuRadioItem value="translation">Search by Translation</DropdownMenuRadioItem>
                                   <DropdownMenuRadioItem value="translation-not">Translation doesn't contain</DropdownMenuRadioItem>
                                   <DropdownMenuRadioItem value="domain">Search by a domain name</DropdownMenuRadioItem>
                                   <DropdownMenuRadioItem value="domain-not">Domain name doesn't contain</DropdownMenuRadioItem>
                                   <DropdownMenuRadioItem value="part-of-speech">Search for the part of speech</DropdownMenuRadioItem>
                              </DropdownMenuRadioGroup>
                         </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuRadioGroup
                         value={filter}
                         onValueChange={(value) => onFilterChange(value as GlossaryFilterType)}
                    >
                         <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                         <DropdownMenuRadioItem value="translated">Translated</DropdownMenuRadioItem>
                         <DropdownMenuRadioItem value="untranslated">Untranslated</DropdownMenuRadioItem>
                         <DropdownMenuRadioItem value="transEqSrc">Translation equals Source</DropdownMenuRadioItem>
                         <DropdownMenuRadioItem value="repeatedStr">Repeated Strings</DropdownMenuRadioItem>
                         <DropdownMenuRadioItem value="caseSensitive">Case Sensitive</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}