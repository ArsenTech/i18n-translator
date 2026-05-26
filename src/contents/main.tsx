import LangSelector from "@/components/lang-selector";
import { TranslationTable } from "@/components/translation-table";
import TreeSidebar from "@/components/tree-sidebar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import WindowWrapper from "@/components/window";
import { mockupData } from "@/lib/constants"
import { buildTree } from "@/lib/helpers";
import { ITranslation } from "@/lib/types";
import { ChevronRight, Copy, FilePlus, FolderOpen, Languages, RotateCcw, Save, Search, SearchCheck } from "lucide-react";
import { useMemo, useState } from "react";

export default function MainPage(){
     const total = useMemo(()=>mockupData.length,[mockupData])
     const translatedCount = useMemo(()=>mockupData.filter(val=>val.translationString.trim()!=="").length,[mockupData])
     const sourceAsTranslationCount = useMemo(()=>mockupData.filter(val=>val.baseString===val.translationString).length,[mockupData])
     const percentage = useMemo(()=>{
          return total > 0 ? Math.min(100,Math.floor((translatedCount / total) * 100)) : 0
     },[translatedCount, total])
     const [selectedNamespace, setSelectedNamespace] = useState<string>("")
     const tree = useMemo(() => buildTree(mockupData), [])
     const tableData = useMemo(() => {
          if (!selectedNamespace) return mockupData
          if (selectedNamespace === "__general") return mockupData.filter(item => !item.keyName.includes("."))
          return mockupData.filter(item =>item.keyName.startsWith(`${selectedNamespace}.`))
     }, [selectedNamespace])
     const [currTranslation, setCurrentTranslation] = useState<ITranslation | null>(null)
     const [input, setInput] = useState("")
     return (
          <WindowWrapper>
               <div className="grid grid-cols-1 md:grid-cols-[0.5fr_1fr] lg:grid-cols-[0.4fr_1fr] xl:grid-cols-[0.3fr_1fr] px-4 py-2 gap-4 md:h-[calc(100dvh-40px)] overflow-hidden">
                    <div className="w-full flex flex-col-reverse md:flex-col gap-1 min-h-0 overflow-hidden">
                         <div className="py-2 gap-1 flex items-center justify-center flex-wrap">
                              <Button variant="secondary" className="flex-1 aspect-square " title="New Translation">
                                   <FilePlus/>
                              </Button>
                              <Button variant="secondary" className="flex-1 aspect-square" title="Open Translations">
                                   <FolderOpen/>
                              </Button>
                              <Button variant="secondary" className="flex-1 aspect-square" title="Save Translation">
                                   <Save/>
                              </Button>
                              <Button variant="secondary" className="flex-1 aspect-square" title="Find Missing Keys">
                                   <Search/>
                              </Button>
                              <Button variant="secondary" className="flex-1 aspect-square" title="Auto-translate">
                                   <Languages/>
                              </Button>
                              <Button variant="secondary" className="flex-1 aspect-square" title="Validate Keys">
                                   <SearchCheck/>
                              </Button>
                              <Button variant="secondary" className="flex-1 aspect-square" title="Replace Translation">
                                   <RotateCcw/>
                              </Button>
                         </div>
                         <TreeSidebar
                              tree={tree}
                              onSelectNamespace={setSelectedNamespace}
                              selectedNamespace={selectedNamespace}
                         />
                    </div>
                    <div className="w-full flex flex-col gap-2 min-h-0 overflow-hidden">
                         <div className="flex items-center gap-2">
                              <span>From</span>
                              <LangSelector placeholder="Base Language" className="flex-1"/>
                              <span>to</span>
                              <LangSelector className="flex-1"/>
                         </div>
                         <TranslationTable
                              data={tableData}
                              selected={selectedNamespace}
                              onSelectTranslation={setCurrentTranslation}
                              currKey={currTranslation?.keyName ?? ""}
                              setInput={setInput}
                         />
                         <div className="flex items-center gap-2">
                              <div className="text-sm">{percentage}%</div>
                              <Progress className="h-3 flex-1" value={percentage}/>
                         </div>
                         <div className="flex gap-2">
                              <Textarea
                                   value={input}
                                   onChange={e=>setInput(e.target.value)}
                                   className="flex-2"
                                   rows={3}
                              />
                              <div className="flex items-center gap-1 flex-wrap flex-1">
                                   <Button className="flex-1" variant="secondary" onClick={()=>{
                                        if(!currTranslation) return;
                                        setInput(currTranslation.baseString)
                                   }}>
                                        <Copy/>
                                        Copy from Source
                                   </Button>
                                   <Button className="flex-1">
                                        <Save/>
                                        Save String
                                   </Button>
                                   <Button className="flex-1">
                                        Next Blank Field
                                        <ChevronRight/>
                                   </Button>
                              </div>
                         </div>
                         <div className="flex justify-between items-center text-xs md:text-sm flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                   <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                                        <span className="text-base md:text-lg">{mockupData.length-translatedCount}</span>
                                        <span className="text-muted-foreground">Untranslated</span>
                                   </div>
                                   <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                                        <span className="text-base md:text-lg">{translatedCount}</span>
                                        <span className="text-muted-foreground">Translated</span>
                                   </div>
                                   {sourceAsTranslationCount>0 && (
                                        <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                                             <span className="text-base md:text-lg">{sourceAsTranslationCount}</span>
                                             <span className="text-muted-foreground">Borrowed from Source</span>
                                        </div>
                                   )}
                                   <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                                        <span className="text-base md:text-lg">{mockupData.length}</span>
                                        <span className="text-muted-foreground">Total</span>
                                   </div>
                              </div>
                              {currTranslation && (
                                   <div className="flex items-center gap-2">
                                        <p className="text-muted-foreground">{currTranslation.keyName}</p>
                                        <div className="flex gap-2 justify-center items-center bg-card border rounded-md px-3 py-1">
                                             <span className="text-muted-foreground">Line &#x2116;</span>
                                             <span className="text-base md:text-lg">{currTranslation.lineNumber}</span>
                                        </div>
                                   </div>
                              )}
                         </div>
                    </div>
               </div>
          </WindowWrapper>
     )
}