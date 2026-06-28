import { Copy, Minus, Square, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useState, useEffect } from "react";
import { message } from "@tauri-apps/plugin-dialog";
import { useAppTranslation } from "@/context/translation";
import FileActions from "@/actions/file";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { useSettings } from "@/context/settings";
import { useTranslation } from "react-i18next";
import useDialogFilters from "@/hooks/use-dialog-filter";

export default function WindowControl(){
     const {t} = useTranslation("titlebar")
     const {t: validationTxt} = useTranslation("validation")
     const filters = useDialogFilters(true)
     const appWindow = getCurrentWindow()
     const {settings} = useSettings()
     const [isMaximized, setIsMaximized] = useState(false)
     const {isDirty, files, setIsDirty, table, langs} = useAppTranslation()
     const handleClose = async () => {
          if(!isDirty) {
               await appWindow.close();
               return
          }
          const paths = files.targetPath.split("\\")
          const confirmation = await message(t("save.confirm",{
               fileName: paths[paths.length-1] || t("untitled")
          }),{
               title: "I18N Translator",
               kind: "warning",
               buttons: "YesNoCancel"
          })
          if (confirmation === "Yes") {
               try {
                    const res = await FileActions.saveFile(files.targetPath.trim()!=="",validationTxt,{
                         table, langs,
                         preserveMetadata: settings.xliffPreserveMeta,
                         preserveTranslations: settings.preserveEmpty,
                         filters, targetPath: files.targetPath
                    })
                    if (res?.success) {
                         setIsDirty(false)
                         await appWindow.close();
                    }
                    if (res?.error) toast.error(t("save.error"), {
                         description: res.error,
                         id: "save-error"
                    })
               } catch (err) {
                    toast.error(t("save.error"), {
                         description: getErrorMessage(err),
                         id: "save-error"
                    })
               }
          }
          if (confirmation === "No") await appWindow.close()
     }
     const handleToggleMaximize = async () => {
          await appWindow.toggleMaximize();
          setIsMaximized(await appWindow.isMaximized())
     }
     const handleMinimize = async () => await appWindow.minimize()
     useEffect(() => {
          const syncState = async () => {
               setIsMaximized(await appWindow.isMaximized())
          }
          syncState()
          const unlisten = appWindow.onResized(syncState)
          return () => {
               unlisten.then(fn => fn())
          }
     }, [])
     return (
          <ButtonGroup className="[&>[data-slot]:not(:has(~[data-slot]))]:rounded-none! h-full">
               <Button size="window-control" variant="ghost" title={t("controls.minimize")} onClick={handleMinimize}><Minus/></Button>
               <Button size="window-control" variant="ghost" title={isMaximized ? t("controls.restore-down") : t("controls.maximize")} onClick={handleToggleMaximize}>
                    {isMaximized ? <Copy/> : <Square/>}
               </Button>
               <Button size="window-control" variant="ghost-destructive" title={t("controls.close-app")} onClick={handleClose}><X/></Button>
          </ButtonGroup>
     )
}