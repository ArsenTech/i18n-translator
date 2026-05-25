"use client"
import {
     flexRender,
     getCoreRowModel,
     getSortedRowModel,
     SortingState,
     useReactTable,
     VisibilityState,
} from "@tanstack/react-table"
import {
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableHeader,
     TableRow,
} from "@/components/ui/table"
import { ITranslation } from "@/lib/types"
import { columns } from "./columns"
import { ButtonGroup } from "@/components/ui/button-group";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Search, X } from "lucide-react";
import Filters from "./filters"
import SortBy from "./sort-by"
import React from "react"

interface DataTableProps {
     data: ITranslation[]
}

export type FilterType =
  | "all"
  | "translated"
  | "untranslated"
  | "transEqSrc"
  | "repeatedStr"

const matchesSearch = (value: string, query: string, reverse = false) => {
     const matched = value.toLowerCase().includes(query.toLowerCase())
     return reverse ? !matched : matched
}

export function TranslationTable({
     data,
}: DataTableProps) {
     const [search, setSearch] = React.useState("")
     const [searchMode, setSearchMode] = React.useState<"key" | "translation" | "source" | "source-not" | "translation-not" | "key-not">("source")
     const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
          baseChars: false,
          baseWords: false,
          translationChars: false,
          translationWords: false,
     })
     const [sorting, setSorting] = React.useState<SortingState>([])
     const [filter, setFilter] = React.useState<FilterType>("all")
     const normalized = (value: string) => value.trim().toLowerCase()
     const repeatedSources = React.useMemo(() => {
          const counts = new Map<string, number>()
          for (const item of data) {
               const source = normalized(item.baseString)
               if (!source) continue
               counts.set(source, (counts.get(source) ?? 0) + 1)
          }
          return counts
     }, [data])
     const filteredData = React.useMemo(() => {
          return data.filter((item) => {
               const source = item.baseString.trim()
               const translation = item.translationString.trim()
               const query = search.trim()
               const passesFilter = (() => {
                    switch (filter) {
                         case "translated": return translation.length > 0
                         case "untranslated": return !translation
                         case "transEqSrc": return source.length > 0 && source === translation
                         case "repeatedStr": return (repeatedSources.get(normalized(item.baseString)) ?? 0) > 1
                         default: return true
                    }
               })()
               if (!passesFilter) return false
               if (!query) return true
               switch (searchMode) {
                    case "key": return matchesSearch(item.keyName, query)
                    case "key-not": return matchesSearch(item.keyName, query, true)
                    case "translation": return matchesSearch(item.translationString, query)
                    case "translation-not": return matchesSearch(item.translationString, query, true)
                    case "source-not": return matchesSearch(item.baseString, query, true)
                    case "source": return matchesSearch(item.baseString, query)
                    default: return true
               }
          })
     }, [data, filter, search, searchMode])
     const table = useReactTable({
          data: filteredData,
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
     const placeholderMap: Record<typeof searchMode,string> = {
          source: "Search for source text",
          "source-not": "Source doesn't contain",
          translation: "Search for translations",
          "translation-not": "Translation doesn't contain",
          key: "Search for key name",
          "key-not": "Key doesn't contain"
     }
     return (
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden gap-2">
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
                                        setSearchMode("source")
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
               <div className="flex flex-col flex-1 min-h-0 overflow-hidden rounded-md border bg-card text-card-foreground shadow-xs">
                    <Table className="min-w-[900px] table-fixed">
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
                                             data-state={row.getIsSelected() && "selected"}
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
               </div>
          </div>
     )
}