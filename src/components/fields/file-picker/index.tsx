import { Noop } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { open } from "@tauri-apps/plugin-dialog";
import { useTranslation } from "react-i18next";

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
     const {t} = useTranslation("file-actions")
     const handleChooseFile = async () => {
          const filters = [
               {
                    name: t("filters.json"),
                    extensions: ["json"]
               },
               {
                    name: t("filters.xml"),
                    extensions: ["xml"]
               },
               // {
               //      name: t("filters.po"),
               //      extensions: ["po", "pot", "mo"]
               // },
               {
                    name: t("filters.resx"),
                    extensions: ["resx"]
               },
          ]
          if(state==="new") filters.push(
          {
               name: t("filters.xliff"),
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
               <Button onClick={handleChooseFile} type="button" variant="secondary">{t("browse")}</Button>
          </ButtonGroup>
     )
}