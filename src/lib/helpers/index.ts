import type { ITranslation, TreeNode } from "@/lib/types/data"
import type { IBackendTranslation } from "../types/data/backend"
import { FileType } from "../types/enums"
import { TFunction } from "i18next"

export function buildTree(data: ITranslation[], t: TFunction): TreeNode[] {
     const root: TreeNode = {
          name: t("tree-sidebar.root"),
          fullPath: "",
          children: [
               {
                    name: t("tree-sidebar.general"),
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
export function toBackendEntries(table: ITranslation[]): IBackendTranslation[] {
     return table.map(val => ({
          key_name: val.keyName,
          base_string: val.baseString,
          translation_string: val.translationString,
          line_number: val.lineNumber,
     }))
}