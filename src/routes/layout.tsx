import WindowWrapper from "@/components/window";
import { Outlet } from "react-router";

export default function RouteLayout(){
     return (
          <WindowWrapper>
               <Outlet/>
          </WindowWrapper>
     )
}