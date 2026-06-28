import { useEditor } from "@/context/editor";
import { useAppTranslation } from "@/context/translation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function TranslatorStats(){
     const {t} = useTranslation("translation",{
          keyPrefix: "translator-stats"
     })
     const {table} = useAppTranslation()
     const {currTranslation} = useEditor()
     const stats = useMemo(() => {
          let translated = 0, borrowed = 0
          for (const item of table) {
               const source = item.baseString.trim();
               const translation = item.translationString.trim();
               if (translation !== "") translated++
               if (source.length > 0 && source === translation) borrowed++
          }
          return {
               translated,
               borrowed,
               untranslated: table.length - translated,
               total: table.length,
          }
     }, [table])
     return (
          <div className="flex justify-between items-center text-xs md:text-sm flex-wrap gap-2">
               <div className="flex items-center gap-2">
                    <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                         <span className="text-base md:text-lg">{stats.untranslated}</span>
                         <span className="text-muted-foreground">
                              {t("untranslated")}
                         </span>
                    </div>
                    <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                         <span className="text-base md:text-lg">{stats.translated}</span>
                         <span className="text-muted-foreground">
                              {t("translated")}
                         </span>
                    </div>
                    {stats.borrowed>0 && (
                         <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                              <span className="text-base md:text-lg">{stats.borrowed}</span>
                              <span className="text-muted-foreground">
                                   {t("borrowed")}
                              </span>
                         </div>
                    )}
                    <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                         <span className="text-base md:text-lg">{stats.total}</span>
                         <span className="text-muted-foreground">
                              {t("total")}
                         </span>
                    </div>
               </div>
               {currTranslation && (
                    <div className="flex items-center gap-2">
                         <p className="text-muted-foreground font-mono font-semibold">{currTranslation.keyName}</p>
                         <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                              <span className="text-muted-foreground">{t("line-num")}</span>
                              <span className="text-base md:text-lg">{currTranslation.lineNumber}</span>
                         </div>
                    </div>
               )}
          </div>
     )
}