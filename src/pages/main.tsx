import LangSelector from "@/components/lang-selector";
import { TranslationTable } from "@/components/translation-table";
import TreeSidebar from "@/components/tree-sidebar";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { mockupData } from "@/lib/types";
import { Copy, Save } from "lucide-react";

export default function MainPage(){
     return (
          <div className="grid grid-cols-1 md:grid-cols-[0.5fr_1fr] lg:grid-cols-[0.4fr_1fr] xl:grid-cols-[0.3fr_1fr] px-4 py-2 gap-4 h-[calc(100dvh-40px)] overflow-hidden">
               <div className="w-full flex flex-col gap-4 min-h-0 overflow-hidden">
                    <div className="p-2 flex items-center justify-center">
                         Quick Actions
                    </div>
                    <TreeSidebar/>
               </div>
               <div className="w-full flex flex-col gap-2 min-h-0 overflow-hidden">
                    <div className="flex items-center gap-2">
                         <span>From</span>
                         <LangSelector placeholder="Base Language" className="flex-1"/>
                         <span>to</span>
                         <LangSelector className="flex-1"/>
                    </div>
                    <TranslationTable
                         data={mockupData}
                    />
                    <div className="flex items-center gap-2">
                         <div className="text-sm">50%</div>
                         <Progress className="h-3 flex-1" value={50}/>
                    </div>
                    <div className="flex gap-2">
                         <Textarea
                              className="flex-2"
                              rows={3}
                         />
                         <ButtonGroup orientation="vertical" className="flex-1">
                              <Button className="flex-1" variant="secondary">
                                   <Copy/>
                                   Copy from Source
                              </Button>
                              <ButtonGroupSeparator/>
                              <Button className="flex-1">
                                   <Save/>
                                   Save the Translation
                              </Button>
                         </ButtonGroup>
                    </div>
                    <div className="flex justify-between items-center text-xs md:text-sm">
                         <div className="flex gap-2 justify-center items-center">
                              <span className="text-base md:text-lg">1234</span>
                              <span className="text-muted-foreground">Untranslated</span>
                         </div>
                         <div className="flex gap-2 justify-center items-center">
                              <span className="text-base md:text-lg">1234</span>
                              <span className="text-muted-foreground">Translated</span>
                         </div>
                         <div className="flex gap-2 justify-center items-center">
                              <span className="text-base md:text-lg">1234</span>
                              <span className="text-muted-foreground">Total</span>
                         </div>
                    </div>
               </div>
          </div>
     )
}