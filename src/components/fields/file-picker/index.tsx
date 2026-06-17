import { Noop } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { open } from "@tauri-apps/plugin-dialog";

interface FilePickerProps{
     onChange: (value: string) => void;
     onBlur?: Noop;
     value: string;
     disabled?: boolean;
     name: string;
     invalid?: boolean,
     placeholder?: string,
     openText?: string,
     state?: "new" | "open"
}
export default function FilePicker({invalid, openText="Open the base language file", state="new", ...field}: FilePickerProps){
     const handleChooseFile = async () => {
          const filters = [
               {
                    name: "JSON Files",
                    extensions: ["json"]
               },
               {
                    name: "XML Files",
                    extensions: ["xml"]
               },
               {
                    name: "GNU gettext",
                    extensions: ["po", "pot", "mo"]
               },
               {
                    name: "Microsoft RESX Files",
                    extensions: ["resx"]
               },
          ]
          if(state==="new") filters.push(
          {
               name: "XLIFF Translation File",
               extensions: ["xliff", "xlf"]
          })
          const path = await open({
               multiple: false,
               directory: false,
               title: openText,
               filters
          });
          if(!path) return;
          field.onChange(path)
     }
     return (
          <ButtonGroup>
               <Input
                    {...field}
                    onChange={e=>field.onChange(e.target.value)}
                    id={field.name}
                    aria-invalid={invalid}
               />
               <Button onClick={handleChooseFile} type="button" variant="secondary">Browse</Button>
          </ButtonGroup>
     )
}