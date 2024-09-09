import React from "react";
import { Typography } from "../ui/typography";
import List from "../list";
import { ATMType } from "@/types";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "../ui/button";

export default function Details({ data, onClick}: { data: ATMType, onClick: any }) {
  return (
    <div className="space-y-2">
      <Button onClick={onClick}>
        <ArrowLeft />
      </Button>

      <div className="bg-white p-4 rounded-lg space-y-2">
      <div>
        <img
          className="w-full h-40 object-cover rounded-lg"
          src={data.image.url}
          alt=""
        />
        <div>
          <Typography variant="sub-title">{data.name}</Typography>
          <Typography className="text-xs">{data.description}</Typography>
        </div>
      </div>

      <hr />

      <div className="space-y-2">
        <Typography variant="sub-title">Services</Typography>
        <div className="space-y-1">
          <List
            data={data.services}
            renderer={(e) => (
              <div className="flex items-center">
                <Check className="text-green-600" size="20px" />
                <Typography size="xs">{e}</Typography>
              </div>
            )}
          />
        </div>
      </div>
      </div>
    </div>
  );
}
