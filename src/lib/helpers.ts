import { TreeNode } from "./types"
import type { ITranslation } from "@/lib/types/data"
import { IBackendTranslation } from "./types/data/backend"
import { TranslationFormat } from "./types/enums"
import { extname } from "@tauri-apps/api/path"

export function buildTree(data: ITranslation[]): TreeNode[] {
     const root: TreeNode = {
          name: "Root",
          fullPath: "",
          children: [
               {
                    name: "General",
                    fullPath: "__general",
                    children: [],
               },
          ],
     }
     for (const item of data) {
          const parts = item.keyName.split(".")
          if (parts.length === 1) continue
          let current = root.children

          for (let i = 0; i < parts.length - 1; i++) {
               const part = parts[i]
               const fullPath = parts.slice(0, i + 1).join(".")

               let existing = current.find(node => node.fullPath === fullPath)

               if (!existing) {
                    existing = {
                         name: part,
                         fullPath,
                         children: [],
                    }

                    current.push(existing)
               }

               current = existing.children
          }
     }
     return [root]
}

export const wordCount = (value: string) => {
     const text = value.trim()
     return text ? text.split(/\s+/).length : 0
}
export function detectLanguageCode(path: string) {
     const parts = path.split(/[\\/]/)
     for (const part of parts) 
          if (/^[a-z]{2}(?:-[a-z]{2})?$/i.test(part)) 
               return part.toLowerCase()
     return ""
}
export function getFileName(path: string) {
     return path.split(/[\\/]/).pop() ?? path
}
export function toBackendEntries(table: ITranslation[]): IBackendTranslation[] {
     return table.map(val => ({
          key_name: val.keyName,
          base_string: val.baseString,
          translation_string: val.translationString,
          line_number: val.lineNumber,
     }))
}

const extensions: Record<string,TranslationFormat> = {
     "json": TranslationFormat.Json,
     "xml": TranslationFormat.Xml,
     "po": TranslationFormat.Po,
     "resx": TranslationFormat.Resx,
     "xliff": TranslationFormat.Xliff
}
export async function getFormatFromPath(path: string): Promise<TranslationFormat> {
     const extension = await extname(path)
     console.log(extension)
     return extensions[extension]
}