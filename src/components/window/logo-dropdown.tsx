import { BookOpen, Code, Grid2X2Plus, Info, Languages, MessageCircleWarning, RotateCcw, Settings } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SiGithub } from "react-icons/si"
import { openUrl } from "@tauri-apps/plugin-opener"
import { lazy, Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { useTranslation } from "react-i18next";

const AboutPopup = lazy(()=>import("@/popups/about"));
const SettingsPopup = lazy(()=>import("@/popups/settings"));
const UpdaterPopup = lazy(()=>import("@/popups/updater"));

interface LogoDropdownProps{
     title?: string,
}
export default function LogoDropdown({title}: LogoDropdownProps){
     const {t} = useTranslation("titlebar",{
          keyPrefix: "logo-dropdown"
     })
     return (
          <DropdownMenu modal={false}>
               <DropdownMenuTrigger>
                    <img src="/logo.png" alt="I18N Translator" width={24} height={24} className="select-none"/> 
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-full min-w-32">
                    <DropdownMenuLabel>{title}</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <Suspense fallback={(
                         <>
                         <Skeleton className="h-5 w-full max-w-56 my-1.5"/>
                         <Skeleton className="h-5 w-full max-w-48 my-1.5"/>
                         <Skeleton className="h-5 w-full max-w-48 my-1.5"/>
                         </>
                    )}>
                         <AboutPopup triggerButton={(
                              <DropdownMenuItem onSelect={e=>e.preventDefault()}>
                                   <Info className="text-muted-foreground"/>
                                   {t("about")}
                              </DropdownMenuItem>
                         )}/>
                         <SettingsPopup triggerButton={(
                              <DropdownMenuItem onSelect={e=>e.preventDefault()}>
                                   <Settings className="text-muted-foreground"/>
                                   {t("settings")}
                              </DropdownMenuItem>
                         )}/>
                         <UpdaterPopup triggerButton={(
                              <DropdownMenuItem onSelect={e=>e.preventDefault()}>
                                   <RotateCcw className="text-muted-foreground"/>
                                   {t("check-updates")}
                              </DropdownMenuItem>
                         )}/>
                    </Suspense>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator")}>
                         <SiGithub className="text-muted-foreground"/>
                         GitHub
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/tree/main/docs")}>
                         <BookOpen className="text-muted-foreground"/>
                         {t("docs")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/blob/main/docs/CONTRIBUTING.md")}>
                         <Code className="text-muted-foreground"/>
                         {t("contribute")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/blob/main/public/locales")}>
                         <Languages className="text-muted-foreground"/>
                         {t("add-lang")}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/issues/new?assignees=&labels=&template=bug_report.md&title=")}>
                         <MessageCircleWarning className="text-muted-foreground"/>
                         {t("bug-report")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/issues/new?assignees=&labels=&template=feature_request.md&title=")}>
                         <Grid2X2Plus className="text-muted-foreground"/>
                         {t("request-feature")}
                    </DropdownMenuItem>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}