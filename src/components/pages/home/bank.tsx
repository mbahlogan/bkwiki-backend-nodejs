import Rating from "@/components/rating";
import { BankType } from "@/types";
import Link from "next/link";
import React from "react";

export default function Bank(props: BankType) {
  return (
    <Link href={`/banks/${props._id}`}>
      <div className="relative block overflow-hidden rounded-lg border border-gray-300 p-4 sm:p-6 lg:p-8">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              {props.name}
            </h3>

            <p className="mt-1 text-xs font-medium text-gray-600">
              <a href={props.website} target="_blank">
                {props.website}
              </a>
            </p>

           
          </div>

          <div className="hidden sm:block sm:shrink-0">
            <img
              alt=""
              src={props.logo.url}
              className="size-10 w-full object-cover "
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-pretty text-sm text-gray-500  line-clamp-2">
            {props.description}
          </p>
        </div>

        <dl className="mt-6 flex gap-4 sm:gap-10">
          <div className="flex flex-col">
            <dt className=" text-xs text-gray-500">Headquarter</dt>
            <dd className="text-sm font-medium text-gray-600">{props.headquarter}</dd>
          </div>

          <div className="flex flex-col">
            <dt className="text-xs text-gray-500">Rating</dt>
            <dd className="-my-1">
            <Rating value={4} />
            </dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}
