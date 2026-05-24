"use client"
import {
     flexRender,
     getCoreRowModel,
     useReactTable,
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
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Search, X } from "lucide-react";

interface DataTableProps {
     data: ITranslation[]
}

export function TranslationTable({
     data,
}: DataTableProps) {
     const table = useReactTable({
          data,
          columns,
          getCoreRowModel: getCoreRowModel(),
     })
     return (
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden gap-2">
               <div className="flex items-center gap-2">
                    <ButtonGroup className="flex-1">
                         <ButtonGroupText>Filters</ButtonGroupText>
                         <InputGroup className="rounded-none!">
                              <InputGroupInput
                                   placeholder="Search translations"
                              />
                              <InputGroupAddon>
                                   <Search/>
                              </InputGroupAddon>
                              <InputGroupAddon align="inline-end">
                                   <InputGroupButton size="icon-sm">
                                        <X/>
                                   </InputGroupButton>
                              </InputGroupAddon>
                         </InputGroup>
                    </ButtonGroup>
                    <div className="bg-card text-card-foreground border shadow-xs rounded-md p-2 text-xs">Sort By</div>
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