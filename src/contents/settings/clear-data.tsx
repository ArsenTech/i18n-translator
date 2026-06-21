import LoadingButton from "@/components/loading-button";
import { AppConfirmation } from "@/components/popups/confirmation";
import SettingsItem from "@/components/settings-item";
import SettingsOption from "@/components/settings-item/settings-option";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/context/settings";
import { useAppTranslation } from "@/context/translation";
import { DEFAULT_SETTINGS } from "@/lib/settings/constants";
import RecentTranslations from "@/lib/store/recent-translations";
import { getErrorMessage } from "@/lib/utils";
import { FileX, RotateCw, Trash2 } from "lucide-react";
import { useCallback, useTransition } from "react";
import { toast } from "sonner";

export default function ClearDataSettings(){
     const {setRecentTranslations} = useAppTranslation()
     const {setSettings, settings} = useSettings()
     const [isPending, startTransition] = useTransition()
     const clearTranslations = () => {
          startTransition(async() => {
               try {
                    const res = await RecentTranslations.clearRecent()
                    if(res.error) {
                         toast.error("Failed to clear recent translations",{
                              description: res.error
                         })
                    }
                    if(res.success) {
                         toast.success(res.success);
                         setRecentTranslations([])
                    }
               } catch (error) {
                    toast.error("Failed to clear recent translations",{
                         description: getErrorMessage(error)
                    })
               }
          })
     }
     const handleClear = useCallback(() => {
          try {
               setSettings(DEFAULT_SETTINGS)
               toast.success("Settings successfully reset to defaults")
          } catch (err) {
               toast.error("Failed to clear some settings",{
                    description: getErrorMessage(err)
               })
          }
     },[settings])
     return (
          <div className="space-y-2">
               <SettingsItem
                    title="Danger Zone"
                    description="Be careful before deleting settings related to I18N Translator"
                    type="danger"
               >
                    <SettingsOption
                         title="Clear Recent Translations"
                         description="This will clear recent translation data"
                    >
                         <AppConfirmation
                              triggerButton={(
                                   <LoadingButton isLoading={isPending} variant="destructive">
                                        <FileX/>
                                        Clear Recent Data
                                   </LoadingButton>
                              )}
                              variant="destructive"
                              Icon={FileX}
                              title="Are you sure you want to clear recent translations?"
                              description="This action cannot be undone"
                              onConfirm={clearTranslations}
                              actionText="Clear"
                         />
                    </SettingsOption>
                    <SettingsOption
                         title="Clear Settings (Permanent)"
                         description="This will clear all settings data"
                    >
                         <AppConfirmation
                              triggerButton={(
                                   <Button variant="destructive">
                                        <Trash2/>
                                        Clear Settings
                                   </Button>
                              )}
                              variant="destructive"
                              Icon={Trash2}
                              title="Are you sure you want to clear all settings?"
                              description="This action cannot be undone"
                              onConfirm={handleClear}
                              actionText="Clear"
                         />
                    </SettingsOption>
                    <SettingsOption
                         title="Restore Defaults"
                         description="This will reset all settings into default values"
                    >
                         <AppConfirmation
                              triggerButton={(
                                   <Button variant="outline">
                                        <RotateCw/>
                                        Restore Defaults
                                   </Button>
                              )}
                              Icon={RotateCw}
                              title="Are you sure you want to restore settings to defaults?"
                              description="This action cannot be undone"
                              onConfirm={handleClear}
                              actionText="Restore"
                         />
                    </SettingsOption>
               </SettingsItem>
               {/* TODO:
               - Clear glossary cache
               - Clear settings (Backend Logic)
               - Reset application (Backend Logic) */}
          </div>
     )
}