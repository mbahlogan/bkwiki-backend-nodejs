import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Claim = () => {
  return (
    <section className="bg-white">
      <div className="container z-20 mx-auto max-w-7xl py-12 px-6 flex-grow flex flex-col md:flex-row flex-wrap  justify-center  items-center md:gap-x-5 ">
        <div className="flex items-center justify-center lg:justify-start w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
          <div className="lg:max-w-xl items-center z-20 justify-center">
            <h2 className="text-2xl font-bold text-tertiary lg:text-4xl text-center lg:text-start">
              Selling Software?
            </h2>
            <h2 className="text-2xl font-bold   lg:text-4xl text-center lg:text-start">
              Reach more buyers .
            </h2>

            <p className="mt-4 text-sm lg:text-lg text-center lg:text-start">
              Your future customers are researching their next purchase on
              BkWiki. <br /> Make sure they can find you.
            </p>
            <div className="items-center flex justify-center lg:justify-start pt-6 ">
              <Button >
                Claim Your BKWIKI Profile
              </Button>
            </div>
          </div>
        </div>
        <div className="z-20">
          <Image alt="" src="/assets/profile.png" width={587} height={417} />
        </div>
      </div>
    </section>
  );
};

export default Claim;
