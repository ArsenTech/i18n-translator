import { Sun, SunDim } from "lucide-react";
import { Slider } from "../ui/slider";
import { useAppearance } from "@/context/appearance";

interface BrightnessSliderProps{
     id?: string,
}
export default function BrightnessSlider({id}: BrightnessSliderProps){
     const {brightness, setBrightness} = useAppearance()
     return (
          <div className="w-full max-w-64 flex items-center gap-2">
               <SunDim className="size-5"/>
               <Slider
                    id={id}
                    value={[brightness]}
                    onValueChange={([value])=>setBrightness(value)}
                    min={0}
                    max={100}
               />
               <Sun className="size-5"/>
          </div>
     )
}