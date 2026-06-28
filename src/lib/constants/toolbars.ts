import { type LucideIcon, BookOpen, BookPlus, Delete, FilePlus, FolderOpen, FolderPen, Languages, RefreshCcw, RotateCcw, Save, Scan, Search, SearchCheck, SearchSlash, SpellCheckIcon } from "lucide-react"
import type { ToolbarValues } from "../types/settings"

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