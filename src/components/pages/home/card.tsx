import { Typography } from "@/components/ui/typography";
import { CardType } from "@/types";
import { Landmark } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Card(props: CardType) {
  return (
    <Link className="h-full" href={"/cards/" + props._id}>
      <div className="block relative overflow-hidden p-0 rounded-lg border border-gray-300 h-[320px]">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
        <img
          alt=""
          src={props.image.url}
          className="h-48 w-full rounded-md rounded-b-none object-cover"
        />

        <div className="p-4">
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <Typography variant="sub-title">{props.name}</Typography>
            </div>
          </div>
          <Typography className="text-sm line-clamp-2">{props.description}</Typography>
          <div className="flex justify-end">
            {props.organisation?.logo.url && (
              <div>
                <img
                  className="w-20"
                  src={props.organisation?.logo.url}
                  alt=""
                />
              </div>
            )}
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
        <Typography size="sm" className="text-primary truncate w-full">
          {text}
        </Typography>
      </div>
    </div>
  );
};
