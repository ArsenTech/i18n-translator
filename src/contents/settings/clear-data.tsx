import LoadingButton from "@/components/loading-button";
import { AppConfirmation } from "@/components/popups/confirmation";
import SettingsItem from "@/components/settings-item";
import SettingsOption from "@/components/settings-item/settings-option";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/context/settings";
import { useAppearance } from "@/context/appearance";
import { useAppTranslation } from "@/context/translation";
import RecentTranslations from "@/lib/store/recent-translations";
import { getErrorMessage } from "@/lib/utils";
import { FileX, RotateCw, Trash2 } from "lucide-react";
import { useCallback, useTransition } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function ClearDataSettings(){
     const {t} = useTranslation("settings",{
          keyPrefix: "danger-zone"
     })
     const {t: validationTxt} = useTranslation("validation")
     const {setRecentTranslations} = useAppTranslation()
     const {resetAll, clearAll, settings} = useSettings()
     const {resetValues, clearValues} = useAppearance()
     const [isPending, startTransition] = useTransition()
     const clearTranslations = () => {
          startTransition(async() => {
               try {
                    const res = await RecentTranslations.clearRecent(validationTxt)
                    if(res.error) {
                         toast.error(t("errors.clear-recent"),{
                              description: res.error,
                              id: "clear-recent-error"
                         })
                    }
                    if(res.success) {
                         toast.success(res.success);
                         setRecentTranslations([])
                    }
               } catch (error) {
                    toast.error(t("errors.clear-recent"),{
                         description: getErrorMessage(error),
                         id: "clear-recent-error"
                    })
               }
          })
     }
     const handleReset = useCallback(() => {
          try {
               resetAll()
               resetValues()
               toast.success(t("success.reset-settings"))
          } catch (err) {
               toast.error(t("errors.reset-settings"),{
                    description: getErrorMessage(err)
               })
          }
     },[settings])
     const handleClear = useCallback(() => {
          try {
               clearAll()
               clearValues()
               toast.success(t("success.clear-settings"))
          } catch (err) {
               toast.error(t("errors.clear-settings"),{
                    description: getErrorMessage(err)
               })
          }
     },[settings])
     return (
          <div className="space-y-2">
               <SettingsItem
                    title={t("title")}
                    description={t("desc")}
                    type="danger"
               >
                    <SettingsOption
                         title={t("clear-recent.title")}
                         description={t("clear-recent.desc")}
                    >
                         <AppConfirmation
                              triggerButton={(
                                   <LoadingButton isLoading={isPending} variant="destructive">
                                        <FileX/>
                                        {t("clear-recent.button")}
                                   </LoadingButton>
                              )}
                              variant="destructive"
                              Icon={FileX}
                              title={t("clear-recent.confirmation")}
                              description={t("cant-be-undone")}
                              onConfirm={clearTranslations}
                              actionText={t("clear-recent.button")}
                         />
                    </SettingsOption>
                    <SettingsOption
                         title={t("clear-settings.title")}
                         description={t("clear-settings.desc")}
                    >
                         <AppConfirmation
                              triggerButton={(
                                   <Button variant="destructive">
                                        <Trash2/>
                                        {t("clear-settings.button")}
                                   </Button>
                              )}
                              variant="destructive"
                              Icon={Trash2}
                              title={t("clear-settings.confirmation")}
                              description={t("cant-be-undone")}
                              onConfirm={handleClear}
                              actionText={t("clear-settings.button")}
                         />
                    </SettingsOption>
                    <SettingsOption
                         title={t("restore-settings.title")}
                         description={t("restore-settings.desc")}
                    >
                         <AppConfirmation
                              triggerButton={(
                                   <Button variant="outline">
                                        <RotateCw/>
                                        {t("restore-settings.button")}
                                   </Button>
                              )}
                              Icon={RotateCw}
                              title={t("restore-settings.confirmation")}
                              description={t("cant-be-undone")}
                              onConfirm={handleReset}
                              actionText={t("restore-settings.button")}
                         />
                    </SettingsOption>
               </SettingsItem>
          </div>
     )
}