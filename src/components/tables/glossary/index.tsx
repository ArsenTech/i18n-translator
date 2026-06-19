"use client"
import { flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ButtonGroup } from "@/components/ui/button-group";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Search, X } from "lucide-react";
import Filters from "./filters"
import SortBy from "./sort-by"
import React from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { GLOSSARY_COLS } from "./columns";
import { useGlossary } from "@/context/glossary";

export type GlossaryFilterType =
  | "all"
  | "translated"
  | "untranslated"
  | "transEqSrc"
  | "repeatedStr"
  | "caseSensitive"

export type GlossarySearchType = "translation" | "term" | "term-not" | "translation-not" | "domain" | "domain-not" | "part-of-speech"

export default function GlossaryTable() {
     const {glossary, currEntry, visibleCount, setCurrentEntry, setVisibleCount, setInput} = useGlossary()
     const [search, setSearch] = React.useState("")
     const [searchMode, setSearchMode] = React.useState<GlossarySearchType>("term")
     const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
          termChars: false,
          termWords: false,
          translationChars: false,
          translationWords: false,
     })
     const [sorting, setSorting] = React.useState<SortingState>([])
     const [filter, setFilter] = React.useState<GlossaryFilterType>("all")
     const repeatedSources = React.useMemo(() => {
          const counts = new Map<string, number>()
          for (const item of glossary) {
               const source = item.term.trim().toLowerCase()
               if (!source) continue
               counts.set(source, (counts.get(source) ?? 0) + 1)
          }
          return counts
     }, [glossary])
     const query = React.useMemo(() => search.trim().toLowerCase(), [search])
     const searchableData = React.useMemo(() => {
          return glossary.map(item => ({
               item,
               termTrimmed: item.term.trim(),
               translationTrimmed: item.translation.trim(),
               term: item.term.toLowerCase(),
               translation: item.translation.toLowerCase(),
               domain: item.domain.toLowerCase(),
               partOfSpeech: item.partOfSpeech.toLowerCase(),
               caseSensitive: item.caseSensitive
          }))
     }, [glossary])
     const filteredData = React.useMemo(() => {
          return searchableData.filter(({ term, termTrimmed, translation, translationTrimmed, domain, partOfSpeech, caseSensitive }) => {
               let passesFilter = true
               switch (filter) {
                    case "translated": 
                         passesFilter = translationTrimmed.length!==0;
                         break;
                    case "untranslated": 
                         passesFilter = translationTrimmed.length<=0;
                         break;
                    case "transEqSrc": 
                         passesFilter = termTrimmed.length > 0 && termTrimmed === translationTrimmed
                         break;
                    case "repeatedStr": 
                         passesFilter = (repeatedSources.get(termTrimmed.toLowerCase()) ?? 0) > 1;
                         break;
                    case "caseSensitive":
                         passesFilter = caseSensitive
                         break
               }
               if (!passesFilter) return false
               if (!query) return true
               switch (searchMode) {
                    case "term": return term.includes(query)
                    case "term-not": return !term.includes(query)
                    case "translation": return translation.includes(query)
                    case "translation-not": return !translation.includes(query)
                    case "domain": return domain.includes(query)
                    case "domain-not": return !domain.includes(query)
                    case "part-of-speech": return partOfSpeech.includes(query)
                    default: return true
               }
          })
          .map(({ item }) => item)
     }, [searchableData, filter, query, searchMode, repeatedSources])
     const visibleRows = React.useMemo(() => filteredData.slice(0, visibleCount),[filteredData, visibleCount])
     const table = useReactTable({
          data: visibleRows,
          columns: GLOSSARY_COLS,
          getCoreRowModel: getCoreRowModel(),
          onSortingChange: setSorting,
          getSortedRowModel: getSortedRowModel(),
          onColumnVisibilityChange: setColumnVisibility,
          state: {
               sorting,
               columnVisibility,
          },
     })
     const scrollRef = React.useRef<HTMLDivElement>(null)
     React.useEffect(() => {
          setVisibleCount(50)
     }, [query, searchMode, filter, glossary])
     React.useEffect(() => {
          const container = scrollRef.current
          if (!container) return
          const handleScroll = () => {
               const threshold = 50
               const reachedBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - threshold
               if (!reachedBottom) return
               setVisibleCount(prev=>Math.min(prev + 50, filteredData.length))
          }
          container.addEventListener("scroll", handleScroll)
          return () => {
               container.removeEventListener("scroll", handleScroll)
          }
     }, [filteredData.length])
     const placeholderMap: Record<typeof searchMode,string> = {
          term: "Search for the term",
          "term-not": "Term doesn't contain",
          translation: "Search for translations",
          "translation-not": "Translation doesn't contain",
          domain: "Search for a domain name",
          "domain-not": "Domain name doesn't contain",
          "part-of-speech": "Search for the part of speech"
     }
     return (
          <div className="flex flex-col flex-1 min-h-0 max-h-[350px] gap-2 overflow-hidden">
               <div className="flex items-center gap-2">
                    <ButtonGroup className="flex-1">
                         <Filters
                              filter={filter}
                              onFilterChange={setFilter}
                              searchMode={searchMode}
                              onSearchModeChange={setSearchMode}
                         />
                         <InputGroup className="rounded-none!">
                              <InputGroupInput
                                   placeholder={placeholderMap[searchMode]}
                                   value={search}
                                   onChange={(event) => setSearch(event.target.value)}
                              />
                              <InputGroupAddon align="inline-start">
                                   <Search/>
                              </InputGroupAddon>
                              <InputGroupAddon align="inline-end">
                                   <InputGroupButton size="icon-xs" onClick={()=>{
                                        setSearch("")
                                        setFilter("all")
                                        setSearchMode("term")
                                   }}>
                                        <X/>
                                   </InputGroupButton>
                              </InputGroupAddon>
                         </InputGroup>
                    </ButtonGroup>
                    <SortBy onSort={(column, desc = false) => {
                         if (!column) {
                              setSorting([])
                              return
                         }
                         setSorting([{ id: column, desc }])
                    }}/>
               </div>
               <div ref={scrollRef} className="flex-1 min-h-0 overflow-auto rounded-md border bg-card text-card-foreground shadow-xs">
                    <Table className="min-w-[900px] relative scroll-mt-0">
                         <TableHeader>
                              {table.getHeaderGroups().map((headerGroup) => (
                                   <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                             <TableHead
                                                  key={header.id}
                                                  className="sticky top-0 z-20 bg-card"
                                                  style={{ width: header.getSize() }}
                                             >
                                                  {header.isPlaceholder
                                                       ? null
                                                       : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                       )}
                                             </TableHead>
                                        ))}
                                   </TableRow>
                              ))}
                         </TableHeader>
                         <TableBody>
                              {table.getRowModel().rows?.length ? (
                                   table.getRowModel().rows.map((row) => (
                                        <TableRow
                                             key={row.id}
                                             id={row.id}
                                             data-state={(row.getIsSelected() || row.original.term===currEntry?.term) && "selected"}
                                             className={cn(
                                                  !row.original.translation && "bg-destructive/5",
                                                  row.original.term===row.original.translation && "bg-amber-50 dark:bg-amber-900"
                                             )}
                                             onClick={()=>{
                                                  setCurrentEntry(row.original)
                                                  setInput(row.original.translation)
                                             }}
                                        >
                                             {row.getVisibleCells().map((cell) => (
                                                  <TableCell
                                                       key={cell.id}
                                                       style={{ width: cell.column.getSize() }}
                                                  >
                                                       {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                       )}
                                                  </TableCell>
                                             ))}
                                        </TableRow>
                                   ))
                              ) : (
                                   <TableRow>
                                        <TableCell
                                             colSpan={GLOSSARY_COLS.length}
                                             className="h-24 text-center"
                                        >
                                             No results.
                                        </TableCell>
                                   </TableRow>
                              )}
                         </TableBody>
                    </Table>
                    {visibleCount < filteredData.length && (
                         <div className="p-2 flex items-center gap-2 text-muted-foreground font-semibold">
                              <Spinner/>
                              Loading more data...
                         </div>
                    )}
               </div>
          </div>
     )
}