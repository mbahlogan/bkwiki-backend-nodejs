import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectType } from "@/types";

export default function SelectField({
  placeholder,
  options = [],
  onChange = () => {},
  name,
  ...rest
}: SelectType) {

  function handleChange (value: string) {
    onChange({target: {value, name}})
  }
  return (
    <Select {...rest} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => {
          return <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>;
        })}
      </SelectContent>
    </Select>
  );
}
