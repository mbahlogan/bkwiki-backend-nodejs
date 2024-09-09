import React from "react";
import { Typography } from "./ui/typography";
import { PriceType } from "@/types";

export default function PricePlan({title, price, subText}: PriceType) {
  return (
    <div className="border border-gray-300">
      <div className="py-4 border-b border-gray-300 bg-gray-200 p-4 text-center">
        <Typography>{title}</Typography>
      </div>

      <div className="flex flex-col justify-center items-center p-4">
        <Typography variant="title" size="mid">
          {price}
        </Typography>
        <Typography variant="paragraph">{subText}</Typography>
      </div>
    </div>
  );
}
