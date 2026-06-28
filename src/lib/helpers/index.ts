import { DEFAULT_SETTINGS } from "../constants/settings/defaults";
import { FileType } from "../types/enums"
import type { TFunction } from "i18next"
import type { SettingsKey } from "../types/settings";

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
export const getFilters = (t: TFunction<"file-actions">,includeXliff = false) => {
     const filters = [
          {
               name: t("filters.json"),
               extensions: ["json"]
          },
          {
               name: t("filters.xml"),
               extensions: ["xml"]
          },
          {
               name: t("filters.po"),
               extensions: ["po", "pot", "mo"]
          },
          {
               name: t("filters.resx"),
               extensions: ["resx"]
          },
     ]
     if(includeXliff) filters.push({
          name: t("filters.xliff"),
          extensions: ["xliff", "xlf"]
     })
     return filters
}
export function initializeValue(key: SettingsKey){
     const fallback = DEFAULT_SETTINGS[key]
     try {
          const raw = localStorage.getItem(key)
          if (!raw) return fallback
          return { ...fallback, ...JSON.parse(raw) }
     } catch {
          return fallback
     }
}