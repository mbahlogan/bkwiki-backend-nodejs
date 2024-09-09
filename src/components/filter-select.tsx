import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

export default function FilterSelect() {
  return (
    <Select>
    <SelectTrigger className=" w-max rounded-full px-4 border-2 shadow-md border-primary text-center font-medium">
      <SelectValue placeholder="All" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="small">Small Business</SelectItem>
      <SelectItem value="mid">Mid Market</SelectItem>
      <SelectItem value="enterprise">Enterprise</SelectItem>
    </SelectContent>
  </Select>
  )
}
