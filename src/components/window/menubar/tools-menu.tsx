import { MenubarContent, MenubarItem, MenubarMenu, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";
import TranslatorActions from "@/actions/translator";
import AutoTranslatePopup from "@/popups/auto-translate";
import TransliterateScriptPopup from "@/popups/transliterate-script";
import { PROVIDER_NAMES } from "@/lib/constants";
import { AutoTranslateProvider } from "@/schemas/types";
import SpellCheckPopup from "@/popups/spell-check"
import { useAppTranslation } from "@/context/translation";
import { toast } from "sonner";
import GlossaryManagerPopup from "@/popups/glossary-manager";

export default function ToolsMenu(){
     const {setTable, table, baseKeys, setIsDirty} = useAppTranslation()
     const removeUnusedKeys = () => {
          const res = TranslatorActions.removeUnusedKeys(table,baseKeys)
          if(res.success) {
               toast.success(res.success)
               setTable(res.data)
               setIsDirty(true)
          }
     }
     const validateKeys = () => {
          const res = TranslatorActions.validateKeys(table, baseKeys)
          if (res.success) {
               toast.success("All keys are valid")
          } else {
               toast.error(`${res.count} invalid keys found`)
          }
     }
     return (
          <MenubarMenu>
               <MenubarTrigger className="tracking-tight">Tools</MenubarTrigger>
               <MenubarContent>
                    <MenubarSub>
                         <MenubarSubTrigger>Translate using</MenubarSubTrigger>
                         <MenubarSubContent>
                              {Object.entries(PROVIDER_NAMES).map(([provider,name])=>(
                                   <AutoTranslatePopup
                                        key={provider}
                                        provider={provider as AutoTranslateProvider}
                                        triggerButton={<MenubarItem onSelect={(e) => e.preventDefault()}>{name}</MenubarItem>}
                                   />
                              ))}
                         </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSub>
                         <MenubarSubTrigger>Validation</MenubarSubTrigger>
                         <MenubarSubContent>
                              <MenubarItem onClick={validateKeys}>Validate Keys</MenubarItem>
                              <MenubarItem onClick={removeUnusedKeys}>Remove Unused Keys</MenubarItem>
                              <SpellCheckPopup triggerButton={(
                                   <MenubarItem onSelect={(e) => e.preventDefault()}>Spell check (using Hunspell)</MenubarItem>
                              )}/>
                         </MenubarSubContent>
                    </MenubarSub>
                    <TransliterateScriptPopup triggerButton={(
                         <MenubarItem onSelect={(e) => e.preventDefault()}>Transliterate Script</MenubarItem>
                    )}/>
                    <GlossaryManagerPopup triggerButton={(
                         <MenubarItem onSelect={e=>e.preventDefault()}>Glossary</MenubarItem>
                    )}/>
               </MenubarContent>
          </MenubarMenu>
     )
}