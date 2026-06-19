import { BookOpen, Code, Grid2X2Plus, Info, MessageCircleWarning, RotateCcw, Settings } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SiGithub } from "react-icons/si"
import { openUrl } from "@tauri-apps/plugin-opener"
import AboutPopup from "@/popups/about";
import SettingsPopup from "@/popups/settings";
import UpdaterPopup from "@/popups/updater";

interface LogoDropdownProps{
     title?: string,
}
export default function LogoDropdown({title}: LogoDropdownProps){
     return (
          <DropdownMenu modal={false}>
               <DropdownMenuTrigger>
                    <img src="/logo.png" alt="I18N Translator" width={24} height={24} className="select-none"/> 
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-full min-w-32">
                    <DropdownMenuLabel>{title}</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <AboutPopup triggerButton={(
                         <DropdownMenuItem onSelect={e=>e.preventDefault()}>
                              <Info className="text-muted-foreground"/>
                              About I18N Translator
                         </DropdownMenuItem>
                    )}/>
                    <SettingsPopup triggerButton={(
                         <DropdownMenuItem onSelect={e=>e.preventDefault()}>
                              <Settings className="text-muted-foreground"/>
                              Settings
                         </DropdownMenuItem>
                    )}/>
                    <UpdaterPopup triggerButton={(
                         <DropdownMenuItem onSelect={e=>e.preventDefault()}>
                              <RotateCcw className="text-muted-foreground"/>
                              Check For Updates
                         </DropdownMenuItem>
                    )}/>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator")}>
                         <SiGithub className="text-muted-foreground"/>
                         Github
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/tree/main/docs")}>
                         <BookOpen className="text-muted-foreground"/>
                         Documentation
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/blob/main/docs/CONTRIBUTING.md")}>
                         <Code className="text-muted-foreground"/>
                         Contribute
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/issues/new?assignees=&labels=&template=bug_report.md&title=")}>
                         <MessageCircleWarning className="text-muted-foreground"/>
                         Report a bug
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenTech/i18n-translator/issues/new?assignees=&labels=&template=feature_request.md&title=")}>
                         <Grid2X2Plus className="text-muted-foreground"/>
                         Request a feature
                    </DropdownMenuItem>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}