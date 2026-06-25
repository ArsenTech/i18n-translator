"use client"
import { ButtonGroup } from "@/components/ui/button-group";
import { lazy, Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

const ModeToggler = lazy(()=>import("./mode"));
const ColorChanger = lazy(()=>import("./color"));

export default function ThemeToggler(){
     return (
          <Suspense fallback={<Skeleton className="h-8 w-32"/>}>
               <ButtonGroup>
                    <ModeToggler/>
                    <ColorChanger/>
               </ButtonGroup>
          </Suspense>
     )
}