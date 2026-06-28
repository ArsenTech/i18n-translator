import { TFunction } from "i18next";
import type { IBackendTranslation } from "../types/data/backend";
import type { ITranslation, TreeNode } from "@/lib/types/data"

export function toBackendEntries(table: ITranslation[]): IBackendTranslation[] {
     return table.map(val => ({
          key_name: val.keyName,
          base_string: val.baseString,
          translation_string: val.translationString,
          line_number: val.lineNumber,
     }))
}
export function buildTree(data: ITranslation[], t: TFunction<"translation","tree-sidebar">): TreeNode[] {
     const root: TreeNode = {
          name: t("root"),
          fullPath: "",
          children: [
               {
                    name: t("general"),
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