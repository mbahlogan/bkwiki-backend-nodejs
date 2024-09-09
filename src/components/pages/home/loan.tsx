import { LoanType } from "@/types";
import Link from "next/link";
import React from "react";

export default function Loan(props: LoanType) {

  return (
    <Link href={`/loans/${props._id}`}>
      <div
        className="relative block overflow-hidden rounded-lg border border-gray-300 p-4 sm:p-6 lg:p-8"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              {props.name}
            </h3>

          </div>

          <div className="hidden sm:block sm:shrink-0">
            <img
              alt=""
              src={props.image?.url}
              className="size-10 w-full object-cover "
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-pretty text-sm text-gray-500  line-clamp-2">
            {props.description}
          </p>
        </div>

        <dl className="mt-6 flex gap-4 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dt className="text-xs font-medium text-gray-600">Interest Rate</dt>
            <dd className=" text-primary text-base">{props.interestRate}%</dd>
          </div>
          <div className="flex flex-col-reverse">
            <dt className="text-xs font-medium text-gray-600">Min Amount</dt>
            <dd className=" text-primary text-base">{props.minAmount}</dd>
          </div>
          <div className="flex flex-col-reverse">
            <dt className="text-xs font-medium text-gray-600">Max Amount</dt>
            <dd className=" text-primary text-base">{props.maxAmount}</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}
