import { CommandDialog } from "@/components/ui/command"
import { useEditor } from "@/context/editor"
import { Popup } from "@/lib/types/string-unions"
import CommandsLoader from "@/loaders/command"
import { lazy, Suspense, useEffect, useRef, useState } from "react"

const CommandsContent = lazy(()=>import("@/contents/command"))
const NewTranslationPopup = lazy(()=>import("@/popups/new-translation"));
const OpenTranslationPopup = lazy(()=>import("@/popups/open-translation"));
const OpenXliffPopup = lazy(()=>import("@/popups/open-xliff"));
const ReplaceTranslationPopup = lazy(()=>import("@/popups/replace-translation"));
const SpellCheckPopup = lazy(()=>import("@/popups/spell-check"));
const FindPopup = lazy(()=>import("@/popups/find"));
const BatchRenameKeysPopup = lazy(()=>import("@/popups/batch-rename-keys"));
const AddToGlossaryPopup = lazy(()=>import("@/popups/add-to-glossary"));
const TransliterateScriptPopup = lazy(()=>import("@/popups/transliterate-script"));
const GlossaryManagerPopup = lazy(()=>import("@/popups/glossary-manager"));
const UpdaterPopup = lazy(()=>import("@/popups/updater"));
const SettingsPopup = lazy(()=>import("@/popups/settings"));
const AboutPopup = lazy(()=>import("@/popups/about"));

export default function CommandsPopup() {
     const {openCommand, setOpenCommand} = useEditor()
     const [popup, setPopup] = useState<Popup>(null)
     const frame = useRef<number|null>(null)
     const openPopup = (popup: Popup) => {
          setOpenCommand(false)
          frame.current = requestAnimationFrame(() => {
               setPopup(popup)
          })
     }
     useEffect(() => {
          return () => {
               if (frame.current!==null) cancelAnimationFrame(frame.current)
          }
     }, [])
     return (
          <>
          <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
               <Suspense fallback={<CommandsLoader/>}>
                    <CommandsContent openPopup={openPopup}/>
               </Suspense>
          </CommandDialog>
          <Suspense fallback={null}>
               <NewTranslationPopup
                    open={popup === "new"}
                    setOpen={open => setPopup(open ? "new" : null)}
               />
               <OpenTranslationPopup
                    open={popup === "open"}
                    setOpen={open => setPopup(open ? "open" : null)}
               />
               <OpenXliffPopup
                    open={popup === "open-xliff"}
                    setOpen={open => setPopup(open ? "open-xliff" : null)}
               />
               <FindPopup
                    open={popup === "find"}
                    setOpen={open => setPopup(open ? "find" : null)}
               />
               <ReplaceTranslationPopup
                    open={popup === "replace"}
                    setOpen={open => setPopup(open ? "replace" : null)}
               />
               <BatchRenameKeysPopup
                    open={popup === "batch-rename"}
                    setOpen={open => setPopup(open ? "batch-rename" : null)}
               />
               <SpellCheckPopup
                    open={popup === "spell-check"}
                    setOpen={open => setPopup(open ? "spell-check" : null)}
               />
               <AddToGlossaryPopup
                    open={popup === "add-glossary"}
                    setOpen={open => setPopup(open ? "add-glossary" : null)}
               />
               <TransliterateScriptPopup
                    open={popup === "transliterate"}
                    setOpen={open => setPopup(open ? "transliterate" : null)}
               />
               <SettingsPopup
                    open={popup === "settings"}
                    setOpen={open => setPopup(open ? "settings" : null)}
               />
               <GlossaryManagerPopup
                    open={popup === "glossary"}
                    setOpen={open => setPopup(open ? "glossary" : null)}
               />
               <UpdaterPopup
                    open={popup === "updater"}
                    setOpen={open => setPopup(open ? "updater" : null)}
               />
               <AboutPopup
                    open={popup === "about"}
                    setOpen={open => setPopup(open ? "about" : null)}
               />
          </Suspense>
          </>
     )
}