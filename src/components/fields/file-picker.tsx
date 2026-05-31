import { Noop } from "react-hook-form";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";
import { open } from "@tauri-apps/plugin-dialog";

interface FilePickerProps{
     onChange: (...event: any[]) => void;
     onBlur?: Noop;
     value: string;
     disabled?: boolean;
     name: string;
     invalid?: boolean,
     placeholder?: string,
     openText?: string
}
export default function FilePicker({invalid, openText="Open the base language file", ...field}: FilePickerProps){
     const handleChooseFile = async () => {
          const path = await open({
               multiple: false,
               directory: false,
               title: openText,
               filters: [
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
                         name: "XLIFF Files",
                         extensions: ["xliff", "xlf"]
                    },
                    {
                         name: "Microsoft RESX Files",
                         extensions: ["resx"]
                    },
               ]
          });
          if(!path) return;
          field.onChange(path)
     }
     return (
          <ButtonGroup>
               <Input
                    {...field}
                    id={field.name}
                    aria-invalid={invalid}
               />
               <Button onClick={handleChooseFile} type="button" variant="secondary">Browse</Button>
          </ButtonGroup>
     )
}