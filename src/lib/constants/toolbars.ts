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
export const TOOLBAR_OPTIONS: { key: keyof ToolbarValues, Icon: LucideIcon}[] = [
     { key: "newFile", Icon: FilePlus },
     { key: "openFile", Icon: FolderOpen },
     { key: "saveFile", Icon: Save },
     { key: "find", Icon: Search },
     { key: "findMissing", Icon: SearchSlash },
     { key: "replace", Icon: RotateCcw },
     { key: "batchRename", Icon: FolderPen },
     { key: "selectUntranslated", Icon: Scan },
     { key: "addToGlossary", Icon: BookPlus },
     { key: "autoTranslate", Icon: Languages },
     { key: "validateKeys", Icon: SearchCheck },
     { key: "removeUnusedKeys", Icon: Delete },
     { key: "transliterate", Icon: RefreshCcw },
     { key: "glossaryManager", Icon: BookOpen },
     { key: "spellCheck", Icon: SpellCheckIcon }
]