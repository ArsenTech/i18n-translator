import { LucideIcon, BookOpen, BookPlus, Delete, FilePlus, FolderOpen, FolderPen, Languages, RefreshCcw, RotateCcw, Save, Scan, Search, SearchCheck, SearchSlash, SpellCheckIcon } from "lucide-react"
import type { ToolbarValues } from "../types/settings"

export const DEFAULT_TOOLBAR_SETTINGS: ToolbarValues = {
     newFile: true,
     openFile: true,
     saveFile: true,
     find: true,
     findMissing: true,
     replace: true,
     batchRename: false,
     selectUntranslated: false,
     addToGlossary: true,
     autoTranslate: false,
     validateKeys: true,
     removeUnusedKeys: false,
     transliterate: false,
     glossaryManager: true,
     spellCheck: false
}
export const TOOLBAR_OPTIONS: { key: keyof ToolbarValues, title: string, Icon: LucideIcon}[] = [
     { key: "newFile", title: "New Translation", Icon: FilePlus },
     { key: "openFile", title: "Open Translation", Icon: FolderOpen },
     { key: "saveFile", title: "Save Translation", Icon: Save },
     { key: "find", title: "Find Translation", Icon: Search },
     { key: "findMissing", title: "Find Missing Keys", Icon: SearchSlash },
     { key: "replace", title: "Replace Translation", Icon: RotateCcw },
     { key: "batchRename", title: "Batch Rename Keys", Icon: FolderPen },
     { key: "selectUntranslated", title: "Select Untranslated", Icon: Scan },
     { key: "addToGlossary", title: "Add to Glossary ", Icon: BookPlus },
     { key: "autoTranslate", title: "Auto-Translate", Icon: Languages },
     { key: "validateKeys", title: "Validate Keys", Icon: SearchCheck },
     { key: "removeUnusedKeys", title: "Remove Unused Keys", Icon: Delete },
     { key: "transliterate", title: "Transliterate Script", Icon: RefreshCcw },
     { key: "glossaryManager", title: "Glossary", Icon: BookOpen },
     { key: "spellCheck", title: "Spell Check", Icon: SpellCheckIcon }
]