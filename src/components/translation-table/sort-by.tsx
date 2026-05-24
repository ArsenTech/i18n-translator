import { ArrowDownUp } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function SortBy(){
     return (
          <DropdownMenu>
               <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                         <ArrowDownUp/>
                         Sort By
                    </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-full min-w-56">
                    <DropdownMenuSub>
                         <DropdownMenuSubTrigger>Translation Updated</DropdownMenuSubTrigger>
                         <DropdownMenuSubContent>
                              <DropdownMenuCheckboxItem>Ascending</DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem>Descending</DropdownMenuCheckboxItem>
                         </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                         <DropdownMenuSubTrigger>Source Updated</DropdownMenuSubTrigger>
                         <DropdownMenuSubContent>
                              <DropdownMenuCheckboxItem>Ascending</DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem>Descending</DropdownMenuCheckboxItem>
                         </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                         <DropdownMenuSubTrigger>Source Words Count</DropdownMenuSubTrigger>
                         <DropdownMenuSubContent>
                              <DropdownMenuCheckboxItem>Ascending</DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem>Descending</DropdownMenuCheckboxItem>
                         </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                         <DropdownMenuSubTrigger>Source Characters Count</DropdownMenuSubTrigger>
                         <DropdownMenuSubContent>
                              <DropdownMenuCheckboxItem>Ascending</DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem>Descending</DropdownMenuCheckboxItem>
                         </DropdownMenuSubContent>
                    </DropdownMenuSub>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}