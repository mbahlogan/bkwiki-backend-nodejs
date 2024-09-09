import { Typography } from "@/components/ui/typography";
import { ATMType } from "@/types";
import { Landmark, MapPin, MapPinned } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ATMs(props: ATMType & { onClick?: any }) {
  return (
    <Link href={"/atms?current=" + props._id}>
      <div
        onClick={props.onClick ? props.onClick : null}
        className="block relative overflow-hidden pb-3 rounded-lg  shadow-xl  bg-white"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
        <img
          alt=""
          src={props.image.url}
          className="h-48 w-full rounded-md rounded-b-none object-cover"
        />

        <div className="mt-1 p-2">
          <div className="flex gap-2 items-center">
            <img className="size-7" src={props.organisation?.logo.url} alt="" />
            <Typography variant="sub-title">{props.name}</Typography>
          </div>

          <div className="mt-1 flex items-center gap-4 text-xs">
            <Info
              icon={<MapPin size="20px" />}
              text={props.address}
              title="Location"
            />
            <Info
              icon={<MapPinned size="20px" />}
              text={props.city}
              title="City"
            />
            <Info
              icon={<Landmark size="20px" />}
              text={props.organisation?.localName}
              title="Bank"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

const Info = ({
  icon,
  title,
  text,
}: {
  title: string;
  text?: string;
  icon: any;
}) => {
  const Icon = () => icon;
  return (
    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
      {icon && <Icon />}

      <div className="mt-1.5 sm:mt-0">
        <Typography variant="paragraph" className="text-gray-500 text-xs">
          {title}
        </Typography>
        <Typography size="sm" className="text-primary text-xs">
          {text}
        </Typography>
      </div>
    </div>
  );
};
