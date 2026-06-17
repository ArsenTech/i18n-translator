import { Menubar } from "@/components/ui/menubar";
import FileMenu from "./file-menu";
import ViewMenu from "./view-menu";
import EditMenu from "./edit-menu";
import ToolsMenu from "./tools-menu";

export default function MenuBar(){
     return (
          <Menubar className="h-full border-0 bg-transparent shadow-none rounded-none">
               <FileMenu/>
               <EditMenu/>
               <ViewMenu/>
               <ToolsMenu/>
          </Menubar>
     )
}