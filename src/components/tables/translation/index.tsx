"use client"
import { flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getColumns } from "./columns"
import { ButtonGroup } from "@/components/ui/button-group";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Search, X } from "lucide-react";
import React, { lazy, Suspense } from "react"
import { cn } from "@/lib/utils"
import { useAppTranslation } from "@/context/translation"
import { Spinner } from "@/components/ui/spinner"
import { Skeleton } from "@/components/ui/skeleton";
import { useSettings } from "@/context/settings";
import { useEditor } from "@/context/editor";

const Filters = lazy(()=>import("./filters"));
const SortBy = lazy(()=>import("./sort-by"));

export type TranslationFilterType =
  | "all"
  | "translated"
  | "untranslated"
  | "transEqSrc"
  | "repeatedStr"

export type TranslationSearchType = "name" | "translation" | "source" | "source-not" | "translation-not" | "name-not"

export default function TranslationTable() {
     const {missingOnly, setCurrentTranslation, currTranslation, visibleCount, setVisibleCount, selectedNamespace, setInput, selectedKeys, setSelectedKeys, selectKey} = useEditor()
     const {visibleTable} = useAppTranslation()
     const {settings} = useSettings()
     const [search, setSearch] = React.useState("")
     const [searchMode, setSearchMode] = React.useState<TranslationSearchType>("source")
     const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
          baseChars: false,
          baseWords: false,
          translationChars: false,
          translationWords: false,
     })
     const [sorting, setSorting] = React.useState<SortingState>([])
     const [filter, setFilter] = React.useState<TranslationFilterType>("all")
     const repeatedSources = React.useMemo(() => {
          const counts = new Map<string, number>()
          for (const item of visibleTable) {
               const source = item.baseString.trim().toLowerCase()
               if (!source) continue
               counts.set(source, (counts.get(source) ?? 0) + 1)
          }
          return counts
     }, [visibleTable])
     const query = React.useMemo(() => search.trim().toLowerCase(), [search])
     const columns = React.useMemo(() => getColumns(selectedNamespace ? selectedNamespace.trim() !== "" : false, settings.showLineNumbers),[selectedNamespace, settings.showLineNumbers])
     const searchableData = React.useMemo(() => {
          return visibleTable.map(item => ({
               item,
               key: item.keyName.toLowerCase(),
               source: item.baseString.toLowerCase(),
               translation: item.translationString.toLowerCase(),
               sourceTrimmed: item.baseString.trim(),
               translationTrimmed: item.translationString.trim(),
          }))
     }, [visibleTable])
     const filteredData = React.useMemo(() => {
          return searchableData.filter(({ key, source, translation, sourceTrimmed, translationTrimmed }) => {
               let passesFilter = true
               if (missingOnly && translationTrimmed.length > 0) return false
               switch (filter) {
                    case "translated": 
                         passesFilter = translationTrimmed.length!==0;
                         break;
                    case "untranslated": 
                         passesFilter = translationTrimmed.length<=0;
                         break;
                    case "transEqSrc": 
                         passesFilter = sourceTrimmed.length > 0 && sourceTrimmed === translationTrimmed
                         break;
                    case "repeatedStr": 
                         passesFilter = (repeatedSources.get(sourceTrimmed.toLowerCase()) ?? 0) > 1;
                         break;
               }
               if (!passesFilter) return false
               if (!query) return true
               switch (searchMode) {
                    case "name": return key.includes(query)
                    case "name-not": return !key.includes(query)
                    case "translation": return translation.includes(query)
                    case "translation-not": return !translation.includes(query)
                    case "source": return source.includes(query)
                    case "source-not": return !source.includes(query)
                    default: return true
               }
          })
          .map(({ item }) => item)
     }, [searchableData, filter, query, searchMode, missingOnly, repeatedSources])
     const visibleRows = React.useMemo(() => filteredData.slice(0, visibleCount),[filteredData, visibleCount])
     const table = useReactTable({
          data: visibleRows,
          columns,
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
          setVisibleCount(100)
     }, [query, searchMode, filter, missingOnly, visibleTable])
     React.useEffect(() => {
          const container = scrollRef.current
          if (!container) return
          const handleScroll = () => {
               const threshold = 100
               const reachedBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - threshold
               if (!reachedBottom) return
               setVisibleCount(prev=>Math.min(prev + 100, filteredData.length))
          }
          container.addEventListener("scroll", handleScroll)
          return () => {
               container.removeEventListener("scroll", handleScroll)
          }
     }, [filteredData.length])
     const placeholderMap: Record<typeof searchMode,string> = {
          source: "Search for source text",
          "source-not": "Source doesn't contain",
          translation: "Search for translations",
          "translation-not": "Translation doesn't contain",
          name: "Search for a key name",
          "name-not": "Key name doesn't contain"
     }
     return (
          <div className="flex flex-col flex-1 min-h-0 gap-2 overflow-hidden">
               <div className="flex items-center gap-2">
                    <ButtonGroup className="flex-1">
                         <Suspense fallback={<Skeleton className="h-8 w-20"/>}>
                              <Filters
                                   filter={filter}
                                   onFilterChange={setFilter}
                                   searchMode={searchMode}
                                   onSearchModeChange={setSearchMode}
                              />
                         </Suspense>
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
                                        setSearchMode("source")
                                   }}>
                                        <X/>
                                   </InputGroupButton>
                              </InputGroupAddon>
                         </InputGroup>
                    </ButtonGroup>
                    <Suspense fallback={<Skeleton className="h-8 w-24"/>}>
                         <SortBy onSort={(column, desc = false) => {
                              if (!column) {
                                   setSorting([])
                                   return
                              }
                              setSorting([{ id: column, desc }])
                         }}/>
                    </Suspense>
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
                                             id={`row-${row.original.keyName}`}
                                             data-state={(row.getIsSelected() || row.original.keyName===currTranslation?.keyName || selectedKeys.has(row.original.keyName)) && "selected"}
                                             className={cn(
                                                  !row.original.translationString && "bg-destructive/5",
                                                  row.original.baseString===row.original.translationString && "bg-amber-50 dark:bg-amber-900"
                                             )}
                                             onClick={e=>{
                                                  setCurrentTranslation(row.original)
                                                  setInput(row.original.translationString)

                                                  if (e.ctrlKey) {
                                                       selectKey(row.original.keyName)
                                                  } else {
                                                       setSelectedKeys(new Set([row.original.keyName]))
                                                  }
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
                                             colSpan={columns.length}
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