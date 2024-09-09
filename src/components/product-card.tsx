"use client";

import {
  CircleAlert,
  DollarSign,
  Heart,
  MousePointerClick,
} from "lucide-react";
import React from "react";
import { Typography } from "./ui/typography";
import StarRatings from "react-star-ratings";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "./ui/checkbox";
import { BankType } from "@/types";
import Link from "next/link";

export default function ProductCard(props: BankType) {
  return (
    <div className="shadow-sm border rounded-xl bg-white">
      <div className="flex p-5 items-start justify-between">
        <div className="flex gap-5 items-center">
          <div className="shadow-sm w-32 h-32 flex justify-center items-center rounded-xl border p-4">
            <img src={props.logo.url} />
          </div>

          <div className="flex flex-col">
            <div>
              <Link href={"/banks/" + props._id}>
                <Typography>{props.name}</Typography>
              </Link>
              <div className="flex items-center gap-2">
                <StarRatings
                  rating={4.5}
                  starRatedColor="#FF492B"
                  numberOfStars={5}
                  starSpacing="0px"
                  starDimension="20px"
                />

                <div className="flex gap-2 items-center">
                  <Typography variant="paragraph" className="text-blue-500">
                    (755)
                  </Typography>

                  <Typography variant="paragraph">
                    <span className="font-semibold">4.7</span> out of{" "}
                    <span className="font-semibold">5</span>
                  </Typography>
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex gap-1">
                <span className="text-green-500">
                  <MousePointerClick strokeWidth="2px" size="18px" />
                </span>

                <Typography size="sm" className="!p-0">
                  1st <span className="text-blue-500">Easiest To Use</span> in
                  Cards
                </Typography>
              </div>
              <div>
                <Button
                  variant="link"
                  className="text-md font-semibold flex items-center !p-0 w-max !m-0"
                >
                  <span className="text-[#FF492B]">
                    <Heart strokeWidth="3px" size="16px" />
                  </span>
                  Save to My Lists
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border border-green-500 p-1.5 rounded-md px-3">
          <div className="flex items-center ">
            <span className="text-green-500">
              {" "}
              <DollarSign />{" "}
            </span>
            <Typography>Entry level price:</Typography>
          </div>

          <Typography className="text-green-500">Free</Typography>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <div className="border-b-2 shadow-sm">
          <TabsList>
            <TabsTrigger className="border-b-4" value="overview">
              Overview
            </TabsTrigger>
            <TabsTrigger disabled className="border-b-4" value="satisfaction">
              User Satisfaction (Coming soon)
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="overview">
          <div className="p-5">
            <div className="flex items-center gap-1">
              <Typography>Description</Typography>
              <CircleAlert size="16px" />
            </div>

            <Typography variant="paragraph">{props.description}</Typography>
          </div>
        </TabsContent>

        <TabsContent value="satisfaction">
          Change your password here.
        </TabsContent>
      </Tabs>

      <div className="p-10 py-5 border-t flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Checkbox id="terms2" />
          <label
            htmlFor="terms2"
            className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Compare
          </label>
        </div>

        <div>
          <Button>Try for free</Button>
        </div>
      </div>
    </div>
  );
}

ProductCard.Skeleton = () => {
  return (
    <div className="">
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <Skeleton className="w-32 h-32 rounded-xl" />
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
};
