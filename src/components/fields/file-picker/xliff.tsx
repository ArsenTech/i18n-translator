import { Noop } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { open } from "@tauri-apps/plugin-dialog";
import { useTranslation } from "react-i18next";

interface XliffFilePickerProps{
     onChange: (value: string) => void;
     onBlur?: Noop;
     value: string;
     disabled?: boolean;
     name: string;
     invalid?: boolean,
     placeholder?: string,
     openText?: string,
}
export default function XliffFilePicker({invalid, openText="Open the base language file", ...field}: XliffFilePickerProps){
     const {t} = useTranslation("file-actions")
     const handleChooseFile = async () => {
          const path = await open({
               multiple: false,
               directory: false,
               title: openText,
               filters: [
                    {
                         name: t("filters.xliff"),
                         extensions: ["xliff", "xlf"]
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
                    onChange={e=>field.onChange(e.target.value)}
                    id={field.name}
                    aria-invalid={invalid}
               />
               <Button onClick={handleChooseFile} type="button" variant="secondary">{t("browse")}</Button>
          </ButtonGroup>
     )
}