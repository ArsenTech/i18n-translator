import { lazy, Suspense, useMemo } from "react";
import TitlebarLoader from "../../loaders/titlebar";
import { useAppearance } from "@/context/appearance";

const TitleBar = lazy(()=>import("./titlebar"));

interface WindowWrapperProps{
     children: React.ReactNode,
     title?: string,
}
export default function WindowWrapper({
     children,
     title="I18N Translator",
}: WindowWrapperProps){
     const {brightness} = useAppearance()
     const darkness = useMemo(()=>(1 - brightness / 100) * 0.8,[brightness])
     return (
          <main className="w-full h-dvh relative">
               <Suspense fallback={<TitlebarLoader/>}>
                    <TitleBar title={title} />
               </Suspense>
               {children}
               {darkness>0 && (
                    <div
                         className="pointer-events-none absolute inset-0 z-50 transition-colors w-full h-full"
                         style={{
                              backgroundColor: `rgba(0,0,0,${darkness})`,
                         }}
                    />
               )}
          </main>
     )
}