import { Filter } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function Filters(){
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
                    <DropdownMenuItem>All</DropdownMenuItem>
                    <DropdownMenuSub>
                         <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                         <DropdownMenuSubContent>
                              <DropdownMenuItem>Translated</DropdownMenuItem>
                              <DropdownMenuItem>Untranslated</DropdownMenuItem>
                         </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem>Missing Keys</DropdownMenuItem>
                    <DropdownMenuItem>Translation equals Source</DropdownMenuItem>
                    <DropdownMenuSub>
                         <DropdownMenuSubTrigger>Validation</DropdownMenuSubTrigger>
                         <DropdownMenuSubContent>
                              <DropdownMenuItem>Has Errors</DropdownMenuItem>
                              <DropdownMenuItem>Has Warnings</DropdownMenuItem>
                         </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                         <DropdownMenuSubTrigger>Search</DropdownMenuSubTrigger>
                         <DropdownMenuSubContent>
                              <DropdownMenuItem>Search by Key</DropdownMenuItem>
                              <DropdownMenuItem>Search by Translation</DropdownMenuItem>
                         </DropdownMenuSubContent>
                    </DropdownMenuSub>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}