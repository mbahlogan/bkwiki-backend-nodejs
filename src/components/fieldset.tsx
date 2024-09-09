import React from "react";
import { Typography } from "./ui/typography";
import { FieldsetType } from "@/types";

export default function Fieldset(props: FieldsetType) {
  return (
    <div className="border border-gray-300 rounded">
      <div className="p-3 px-6 border-b border-gray-300">
        <Typography size="md">{props.title}</Typography>
      </div>

      <div>
        {props.children}
      </div>
    </div>
  );
}
