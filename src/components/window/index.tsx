import { lazy, Suspense } from "react";
import TitlebarLoader from "../../loaders/titlebar";
import { useAppearance } from "@/context/appearance";

const TitleBar = lazy(()=>import("./titlebar"));

interface WindowWrapperProps{
     children: React.ReactNode,
     title?: string,
     hideMaximize?: boolean
}
export default function WindowWrapper({
     children,
     title="I18N Translator",
     hideMaximize=false
}: WindowWrapperProps){
     const {brightness} = useAppearance()
     return (
          <main className="w-full h-full relative">
               <Suspense fallback={<TitlebarLoader/>}>
                    <TitleBar
                         hideMaximize={hideMaximize}
                         title={title}
                    />
               </Suspense>
               <div style={{filter: `brightness(${brightness}%)`}}>
                    {children}
               </div>
          </main>
     )
}