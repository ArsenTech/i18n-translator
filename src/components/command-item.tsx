import { useEditor } from "@/context/editor"
import { CommandAction } from "@/lib/types/data"
import { CommandItem, CommandShortcut } from "./ui/command"
import { Popup } from "@/lib/types/string-unions"
import { useState } from "react"
import FileActions from "@/actions/file"
import { getErrorMessage } from "@/lib/utils"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { useAppTranslation } from "@/context/translation"
import { useSettings } from "@/context/settings"
import useDialogFilters from "@/hooks/use-dialog-filter"

interface CommandsPopupItemProps{
     data: CommandAction,
     openPopup: (popup: Popup) => void
}
export default function CommandsPopupItem({data, openPopup}: CommandsPopupItemProps){
     const {t: msgTxt} = useTranslation("menubar",{
          keyPrefix: "messages"
     })
     const {t: validationTxt} = useTranslation("validation")
     const {setOpenCommand} = useEditor()
     const {settings} = useSettings()
     const filters = useDialogFilters(true)
     const {table, files, setIsDirty, langs} = useAppTranslation()
     const [isSaving, setIsSaving] = useState(false)
     const save = async () => {
          if(isSaving || !data.saveType) return;
          setIsSaving(true)
          try {
               const res = await FileActions.saveFile(data.saveType==="save-all",validationTxt,{
                    table, langs,
                    preserveMetadata: settings.xliffPreserveMeta,
                    preserveTranslations: settings.preserveEmpty,
                    filters, targetPath: files.targetPath
               })
               if(res?.error) toast.error(msgTxt("save-error"),{
                    description: res.error
               })
               if(res?.success) {
                    toast.success(res.success)
                    setIsDirty(false)
                    setOpenCommand(false)
               }
          } catch (err){
               toast.error(msgTxt("save-error"),{
                    description: getErrorMessage(err)
               })
          } finally {
               setIsSaving(false)
          }
     }
     const handleSelect = () => {
          if (data.popup) {
               openPopup(data.popup)
               return
          }
          if (data.saveType) {
               save()
               return
          }
          setOpenCommand(false)
     }
     return (
          <CommandItem disabled={isSaving || data.disabled} onSelect={handleSelect}>
               <data.Icon className="text-muted-foreground"/>
               {data.label}
               {data.shortcut && (
                    <CommandShortcut>{data.shortcut}</CommandShortcut>
               )}
          </CommandItem>
     )
}