import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Review = () => {
  return (
    <section className="">
      <div className="container z-20 mx-auto max-w-7xl py-12 px-6  flex-grow flex flex-col lg:flex-row-reverse flex-wrap md:flex-nowrap sm:justify-center  items-center md:gap-x-5 ">
        <div className="flex items-center justify-center lg:justify-start w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
          <div className="lg:max-w-xl items-center z-20 md:justify-start">
            <h2 className="text-4xl font-bold text-tertiary text-center lg:text-start">
              Using Software?{" "}
            </h2>
            <p className="text-center my-2 font-bold text-4xl  lg:text-start">
              Write a review.
            </p>

            <p className="mt-4  dark:text-gray-400 lg:text-lg text-center lg:text-start">
              Help over 5 million monthly Buyers on G2 make the right choice for
              their business.
            </p>
            <div className="items-center flex justify-center lg:justify-start pt-6 ">
              <Button>
                Write a Review
              </Button>
            </div>
          </div>
        </div>
        <div className="z-20">
          <Image
            alt=""
            src="/assets/homepage-reviews.png"
            width={587}
            height={417}
          />
        </div>
      </div>

      <div className="bg-[#082846] text-white">
        <div className="container z-20 mx-auto max-w-7xl py-24 px-6 flex-grow flex flex-col lg:flex-row flex-wrap md:flex-nowrap sm:justify-center  items-center md:gap-x-5">
          <div className="flex-1">
            <h4 className="md:text-4xl font-normal !leading-[55px]">
              BKWIKI has been a great place for me to both{" "}
              <span className="text-primary">find</span> and{" "}
              <span className="text-primary">review</span> software it s
              actually been fun to see my reviews go up, get marked helpful
            </h4>
            <div className="my-5 hidden md:block">
              <p className="font-semibold">Matthew Gardener</p>
              <p>Co-founder, RouteThis</p>
              <p>BkWiki reviewer</p>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <Image alt="" src="/assets/reviewer.png" className="w-full max-w-sm" width={587} height={417} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
