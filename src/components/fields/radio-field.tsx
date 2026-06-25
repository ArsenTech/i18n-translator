import { Noop } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { SelectType } from "@/lib/types";

interface RadioFieldProps{
     onChange: (value: string) => void;
     onBlur?: Noop;
     value: string;
     disabled?: boolean;
     name: string;
     invalid?: boolean,
     items: SelectType[] | Readonly<SelectType[]>,
     className?: string
}
export default function RadioField({onChange, name, value, disabled, invalid, onBlur, items, className}: RadioFieldProps){
     return (
          <RadioGroup
               name={name}
               value={value}
               onValueChange={onChange}
               aria-invalid={invalid}
               disabled={disabled}
               onBlur={onBlur}
               className={className}
          >
               {items.map(item => (
                    <div key={item.value} className="flex items-center gap-3">
                         <RadioGroupItem value={item.value} id={`${name}-${item.value}`} />
                         <Label htmlFor={`${name}-${item.value}`}>{item.label}</Label>
                    </div>
               ))}
          </RadioGroup>
     )
}