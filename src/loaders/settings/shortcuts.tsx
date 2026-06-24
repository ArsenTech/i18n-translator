import { TableLoader } from "../translator";

export default function ShortcutSettings(){
     return (
          <div className="space-y-2">
               <TableLoader rows={10} cols={[50,100]} excludeMinWidth/>
          </div>
     )
}