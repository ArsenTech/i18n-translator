import { Noop } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface RadioFieldProps{
     onChange: (value: string) => void;
     onBlur?: Noop;
     value: string;
     disabled?: boolean;
     name: string;
     invalid?: boolean,
     items: {label: string, value: string}[]
}
export default function RadioField({onChange, name, value, disabled, invalid, onBlur, items}: RadioFieldProps){
     return (
          <RadioGroup
               name={name}
               value={value}
               onValueChange={onChange}
               aria-invalid={invalid}
               disabled={disabled}
               onBlur={onBlur}
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