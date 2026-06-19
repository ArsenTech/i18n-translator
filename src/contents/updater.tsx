import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { IUpdaterState, PopupContentProps} from "@/lib/types";
import { getErrorMessage, cn } from "@/lib/utils";
import { openUrl } from "@tauri-apps/plugin-opener";
import { relaunch } from "@tauri-apps/plugin-process";
import { RotateCcw, RotateCw, ScrollText } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useTransition, useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { check } from "@tauri-apps/plugin-updater"
import { INITIAL_UPDATER_STATE } from "@/lib/constants";
import { UpdaterStatus } from "@/lib/types/enums";
import { useTranslation } from "react-i18next";
import { DialogFooter } from "@/components/ui/dialog";

export default function UpdaterContent({open}: PopupContentProps){
     const [isChecking, startChecking] = useTransition();
     const [isUpdating, startUpdating] = useTransition();
     const {t} = useTranslation("update")
     const [update, setUpdate] = useState<IUpdaterState>(INITIAL_UPDATER_STATE)
     const setUpdaterState = (overrides: Partial<IUpdaterState>) => setUpdate(prev=>({...prev, ...overrides}))
     const checkForUpdates = async () => {
          if(!open) return;
          setUpdaterState({
               status: UpdaterStatus.Checking,
               downloaded: 0,
               total: 0
          })
          startChecking(async()=>{
               try {
                    const update = await check();
                    setUpdaterState({
                         status: update ? UpdaterStatus.NeedsUpdate : UpdaterStatus.Updated,
                    })
               } catch (err){
                    toast.error(t("failed-check.main"),{
                         description: getErrorMessage(err)
                    })
                    setUpdaterState({
                         status: UpdaterStatus.CheckError,
                    })
               }
          })
     }
     const updateApp = () => {
          if(!open) return;
          setUpdaterState({
               status: UpdaterStatus.Updating,
               downloaded: 0,
               total: 0
          })
          startUpdating(async()=>{
               try {
                    const update = await check();
                    if(update){
                         ["tauri-version","app-version","app-name","app-identifier"].map(val=>localStorage.removeItem(val))
                         let downloaded = 0, contentLength = 0;
                         await update.downloadAndInstall((event) => {
                              switch (event.event) {
                                   case 'Started':
                                        contentLength = event.data.contentLength || 0;
                                        setUpdaterState({
                                             total: contentLength,
                                             downloaded
                                        })
                                        break;
                                   case 'Progress':
                                        downloaded += event.data.chunkLength;
                                        setUpdaterState({
                                             total: contentLength,
                                             downloaded
                                        })
                                        break;
                                   case 'Finished':
                                        setUpdaterState({
                                             status: UpdaterStatus.Completed
                                        })
                                        break;
                              }
                         });
                    }
               } catch (err){
                    toast.error(t("failed-update.main"),{
                         description: getErrorMessage(err)
                    })
                    setUpdaterState({
                         status: UpdaterStatus.UpdateError,
                         total: 0,
                         downloaded: 0
                    })
               }
          })
     }
     useEffect(()=>{
          if(!open) return;
          checkForUpdates()
     },[open]);
     const currProgress = useMemo(()=>(update.downloaded/update.total)*100,[update.downloaded,update.total]);
     return (
          <>
          <h2 className={cn(
               "text-xl font-semibold",
               (update.status==="failed-check" || update.status==="failed-update") && "text-destructive",
               (update.status==="checking" || update.status==="updating") && "text-muted-foreground"
          )}>{t(`${update.status}.main`)}</h2>
          <p className="text-sm text-muted-foreground">{t(`${update.status}.secondary`)}</p>
          {(update.status==="needs-update" || update.status==="updating") && (
               <div className="flex items-center justify-center w-full max-w-md gap-3">
                    {!isNaN(currProgress) && (
                         <span className="font-medium">{currProgress.toFixed(0)}%</span>
                    )}
                    <Progress value={currProgress}/>
               </div>
          )}
          <DialogFooter>
               {update.status==="completed" ? (
                    <Button type="button" onClick={async() => await relaunch()}>
                         <RotateCcw/>
                         {t("buttons.relaunch")}
                    </Button>
               ) : (update.status==="needs-update" || update.status==="updating") ? (
                    <ButtonGroup>
                         <Button type="button" disabled={isUpdating} onClick={updateApp}>
                              <RotateCw className={cn(isUpdating && "animate-spin")}/>
                              {isUpdating ? t("buttons.update.pending") : t("buttons.update.original")}
                         </Button>
                         <Button type="button" variant="secondary" size="icon" title={t("buttons.changelog")} onClick={async() => await openUrl("https://github.com/ArsenTech/i18n-translator/blob/main/CHANGELOG.md")}>
                              <ScrollText/>
                         </Button>
                    </ButtonGroup>   
               ) : (
                    <Button type="button" onClick={checkForUpdates} disabled={isChecking}>
                         <RotateCw className={cn(isChecking && "animate-spin")}/>
                         {isChecking ? t("buttons.check.pending") : t("buttons.check.original")}
                    </Button>
               )}
          </DialogFooter>
          </>
     )
}