import { useMemo } from "react"
import { useTranslation } from "react-i18next"

export default function useDialogFilters(includeXliff=false){
     const {t} = useTranslation("file-actions",{
          keyPrefix: "filters"
     })
     const filters = useMemo(()=>[
          {
               name: t("json"),
               extensions: ["json"]
          },
          {
               name: t("xml"),
               extensions: ["xml"]
          },
          {
               name: t("po"),
               extensions: ["po", "pot", "mo"]
          },
          {
               name: t("resx"),
               extensions: ["resx"]
          },
     ],[t])
     if(includeXliff) filters.push({
          name: t("xliff"),
          extensions: ["xliff", "xlf"]
     })
     return filters
}