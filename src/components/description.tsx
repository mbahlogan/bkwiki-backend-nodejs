import React from "react";
import { Typography } from "./ui/typography";
import { FieldsetType } from "@/types";

export default function Description(props: FieldsetType) {
  return (
    <div>
      <Typography>{props.title}</Typography>
      <Typography variant="paragraph">{props.children}</Typography>
    </div>
  );
}
