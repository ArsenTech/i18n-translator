import { TreeNode } from "./types"
import type { ITranslation } from "@/lib/types/data"

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