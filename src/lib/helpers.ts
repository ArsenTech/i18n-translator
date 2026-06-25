import { TreeNode } from "./types"
import type { GlossaryEntry, ITranslation } from "@/lib/types/data"
import { IBackendTranslation } from "./types/data/backend"
import { FileType, TranslationFormat } from "./types/enums"
import { extname } from "@tauri-apps/api/path"
import { writeTextFile } from "@tauri-apps/plugin-fs"

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
export function detectLanguageCode(path: string, type: FileType) {
     if (type === FileType.Xliff) return "";
     const parts = path.split(/[\\/]/)
     if (type === FileType.AndroidXml) {
          const values = [...parts].reverse().find(part =>
               /^values(?:-([a-z]{2}(?:-r[A-Z]{2})?))?$/i.test(part)
          )
          const match = values?.match(/^values-([a-z]{2}(?:-r[A-Z]{2})?)$/i)
          return match?.[1]?.replace("-r", "-").toLowerCase() ?? ""
     }
     const fileName = parts.at(-1)?.replace(/\.[^.]+$/, "") ?? "";
     const match = fileName.match(/(?:^|[._-])([a-z]{2}(?:-[a-z]{2})?)(?:$|[._-])/gi)
     return match?.[1]?.toLowerCase() ?? ""
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
     return extensions[extension]
}

export function findValue(value: string, query: string, caseSensitive: boolean){
     if(caseSensitive) return value.includes(query);
     return value.toLowerCase().includes(query.toLowerCase());
}

const escapeCSV = (value: unknown) => {
     if (value == null) return "";
     const str = String(value);
          if (str.includes(",") || str.includes('"') || str.includes("\n")) {
          return `"${str.replace(/"/g, '""')}"`;
     }
     return str;
};
export const exportCSV = async (path: string, data: GlossaryEntry[]) => {
     const headers = ["term", "translation", "partOfSpeech", "domain", "caseSensitive"];
     const rows = data.map(item =>headers.map(h => escapeCSV(item[h as keyof typeof item])).join(","));
     await writeTextFile(path, [headers.join(","), ...rows].join("\n"));
};
export const exportJSON = async(path: string, data: GlossaryEntry[]) => {
     const jsonData = JSON.stringify(data,null,2);
     await writeTextFile(path,jsonData);
}