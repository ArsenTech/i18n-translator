import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SETTINGS_TABS } from "@/lib/settings/tabs";
import { SettingsTab } from "@/lib/types/enums";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense, useMemo, useState } from "react";

interface SettingsContentProps{
     currTab?: SettingsTab | null
}
export default function SettingsContent({currTab}: SettingsContentProps){
     const [tab, setTab] = useState(()=> currTab ?? (localStorage.getItem("settings-tab") || SettingsTab.General));
     const changeTab = (tab: SettingsTab) => {
          setTab(tab);
          localStorage.setItem("settings-tab",tab)
     }
     const activeTab = useMemo(()=>SETTINGS_TABS.find(t => t.page === tab),[tab]);
     return (
          <>
          {activeTab && (
               <p className="text-muted-foreground">Settings &gt; {activeTab.tabName}</p>
          )}
          <Tabs
               value={tab}
               defaultValue={currTab ?? undefined}
               onValueChange={tab => changeTab(tab as SettingsTab)}
               orientation="horizontal"
          >
               <TabsList className="w-full h-full min-h-0">
                    {SETTINGS_TABS.map(({page, Icon, tabName, disabled})=>(
                         <TabsTrigger key={page} value={page} title={tabName} disabled={disabled}>
                              <Icon className="size-5 my-1.5"/>
                         </TabsTrigger>
                    ))}
               </TabsList>
               <ScrollArea className="h-[50vh]">
                    {activeTab && (
                         <TabsContent value={activeTab.page}>
                              <Suspense fallback={activeTab.Loader ? <activeTab.Loader/> : null}>
                                   <activeTab.LazyComponent/>
                              </Suspense>
                         </TabsContent>
                    )}
               </ScrollArea>
          </Tabs>
          </>
     )
}