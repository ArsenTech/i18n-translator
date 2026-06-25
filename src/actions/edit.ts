import type { ITranslation } from "@/lib/types/data"

export default class EditActions{
     public static undo(){
          document.execCommand("undo")
     }
     public static redo(){
          document.execCommand("redo")
     }
     public static async cut(input: HTMLInputElement | HTMLTextAreaElement | null){
          if(input===null) return {error: "inputRef is required"}
          const start = input.selectionStart ?? 0
          const end = input.selectionEnd ?? 0
          await navigator.clipboard.writeText(input.value.slice(start, end))
          input.setRangeText("", start, end, "start")
          input.dispatchEvent(new Event("input", { bubbles: true }))
     }
     public static async copy(input: HTMLInputElement | HTMLTextAreaElement | null){
          if(input===null) return {error: "inputRef is required"}
          const selected = input.value.slice(
               input.selectionStart ?? 0,
               input.selectionEnd ?? 0
          )
          await navigator.clipboard.writeText(selected)
     }
     public static async paste(input: HTMLInputElement | HTMLTextAreaElement | null){
          if(input===null) return {error: "inputRef is required"}
          const text = await navigator.clipboard.readText()
          input.setRangeText(
               text,
               input.selectionStart ?? 0,
               input.selectionEnd ?? 0,
               "end"
          )
          input.dispatchEvent(new Event("input", { bubbles: true }))
     }
     public static selectAll(table: ITranslation[], onSelect: (keys: Set<string>) => void){
          const active = document.activeElement
          if (
               active instanceof HTMLInputElement ||
               active instanceof HTMLTextAreaElement
          ) {
               active.select()
               return
          }
          if (table.length === 0) return
          onSelect(new Set(table.map(val=>val.keyName)))
     }
     public static selectUntranslated(table: ITranslation[], onSelect: (keys: Set<string>) => void){
          const active = document.activeElement
          if (
               active instanceof HTMLInputElement ||
               active instanceof HTMLTextAreaElement
          ) {
               active.select()
               return
          }
          if (table.length === 0) return
          const untranslated = table.filter(item => item.translationString.trim() === "")
          if (untranslated.length === 0) return
          onSelect(new Set(untranslated.map(val=>val.keyName)))
     }
     public static clearSelection(onSelect: (keys: Set<string>) => void){
          onSelect(new Set())
     }
}