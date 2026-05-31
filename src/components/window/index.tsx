import { lazy, Suspense } from "react";
import TitlebarLoader from "../loaders/titlebar";

const TitleBar = lazy(()=>import("./titlebar"));

interface WindowWrapperProps{
     children: React.ReactNode,
     hideMenubar?: boolean,
     title?: string,
     hideMaximize?: boolean
}
export default function WindowWrapper({
     children,
     hideMenubar=false,
     title="I18N Translator",
     hideMaximize=false
}: WindowWrapperProps){
     return (
          <main className="w-full h-full relative">
               <Suspense fallback={<TitlebarLoader/>}>
                    <TitleBar
                         hideMaximize={hideMaximize}
                         hideMenubar={hideMenubar}
                         title={title}
                    />
               </Suspense>
               {children}
          </main>
     )
}