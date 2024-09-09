import Image from "next/image";
import React from "react";


import Link from "next/link";
import { Button } from "@/components/ui/button";

const Banner = () => {
  return (
    <div className="container z-20 mx-auto max-w-7xl py-12 px-6 flex-grow flex flex-wrap md:flex-nowrap sm:justify-center  items-center md:gap-x-5">
      <div className="flex items-center justify-center md:justify-start w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
        <div className="lg:max-w-xl items-center z-20 md:justify-start">
          <div className="flex text-center items-center gap-2">
          <img width={40} src="/logo.png" alt="" />
            <p className="font-bold text-inherit">BKwiki</p>
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl text-center md:text-start">
            Build Your New{" "}
            <span className="text-blue-600 dark:text-blue-400">Idea</span>
          </h2>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 lg:text-lg text-center md:text-start">
            Evaluate SaaS ROI, slash spend, avoid overpaying for renewals, know
            who s using what licenses, and pick the perfect software for your
            team.
          </p>
          <div className="items-center flex justify-center md:justify-start pt-6 ">
            <Button>
              <Link href="/auth/register">Sign up for free</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="z-20">
        <Image alt="" src="/assets/home.png" width={587} height={417} />
      </div>
    </div>
  );
};

export default Banner;
