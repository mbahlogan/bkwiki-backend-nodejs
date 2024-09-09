"use client";

import PageLayout from "@/components/layout";
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageBreadcrumb from "@/components/page-breadcrumb";
import { Typography } from "@/components/ui/typography";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRatings from "react-star-ratings";
import Image from "next/image";
import ProductInfo from "./tabs/product-info";
import Branches from "./branches";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import bankAction from "@/redux/modules/bank/bank.action";
import { useParams } from "next/navigation";
import { selectBank } from "@/redux/modules/bank/bank.selector";
import { BankType } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import ATM from "./tabs/atms";
import Cards from "./tabs/cards";
import Loans from "./tabs/loans";
import Review from "./tabs/review";

const BankDetail = () => {
  const id = useParams().id as string;

  const { data, loading }: { loading: boolean; error: any; data: BankType } =
    useAppSelector(selectBank);
    
    
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(bankAction.getBankById(id));
  }, []);
  return (
    <PageLayout>
      <div className="bg-[#EEE] h-full pb-8">
        <div className="container py-6 ">
          <PageBreadcrumb />
        </div>
        {loading ? (
          <div className="container">
            <Skeleton className="w-full h-[400px]" />
          </div>
        ) : (
          <div className="container">
            <div className=" bg-white border border-gray-300">
              <div className="flex justify-between items-start  pb-0 p-5 ">
                <div className="flex gap-5">
                  <div className="p-3 border border-gray-300 shadow-sm">
                    <div className="w-32 h-32 flex justify-center items-center rounded ">
                      <img src={data.logo?.url} className="w-20" alt="" />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div>
                      <Typography size="mid">{data.name}</Typography>
                      <div className="flex items-center gap-2">
                        <StarRatings
                          rating={4.5}
                          starRatedColor="#FF492B"
                          numberOfStars={5}
                          starSpacing="0px"
                          starDimension="20px"
                        />

                        <div className="flex gap-2 items-center">
                          <Typography
                            variant="paragraph"
                            className="text-blue-500 font-normal"
                          >
                            755 reviews
                          </Typography>
                          |{" "}
                          <Typography className="text-blue-900 ">
                            175 discussions
                          </Typography>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="link"
                          className="text-md flex items-center !p-0 w-max !m-0"
                        >
                          <span className="text-[#FF492B]">
                            <Heart strokeWidth="3px" size="16px" />
                          </span>
                          Save to My Lists
                        </Button>
                        |
                        <Button
                          variant="link"
                          className="text-md flex items-center !p-0 w-max !m-0"
                        >
                          <Image
                            src="/assets/certified.svg"
                            width={24}
                            height={24}
                            alt=""
                          />
                          <Typography className="font-medium">
                            Claimed
                          </Typography>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <Button>Contact {data.name}</Button>
                  {/* <Button>Start free trials</Button> */}
                </div>
              </div>
              <div className="-my-6 mb-6 hid">
                <Tabs defaultValue="productInformation" className="">
                  <div className="border-b border-gray-300">
                    <TabsList className="container w-full  max-w-lg ml-44">
                      <TabsTrigger
                        className="border-b-2"
                        value="productInformation"
                      >
                        General Information
                      </TabsTrigger>
                      <TabsTrigger disabled className="border-b-2" value="services">
                        Services
                      </TabsTrigger>
                      <TabsTrigger disabled className="border-b-2" value="accounts">
                        Accounts
                      </TabsTrigger>
                      <TabsTrigger className="border-b-2" value="branches">
                        Branches
                      </TabsTrigger>
                      <TabsTrigger className="border-b-2" value="atms">
                      ATMs
                      </TabsTrigger>
                      <TabsTrigger className="border-b-2" value="cards">
                        Cards
                      </TabsTrigger>
                      <TabsTrigger className="border-b-2" value="loans">
                        Loans
                      </TabsTrigger>
                      <TabsTrigger className="border-b-2" value="reviews">
                        Reviews
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="productInformation">
                    <ProductInfo {...data} />
                  </TabsContent>

                  <TabsContent value="services">services</TabsContent>
                  <TabsContent value="accounts">accounts</TabsContent>
                  <TabsContent value="branches">
                    <Branches />
                  </TabsContent>
                  <TabsContent value="atms">
                    <ATM />
                  </TabsContent>
                  <TabsContent value="cards">
                    <Cards />
                  </TabsContent>
                  <TabsContent value="loans">
                    <Loans  />
                  </TabsContent>
                  <TabsContent value="reviews">
                    <Review />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default BankDetail;
