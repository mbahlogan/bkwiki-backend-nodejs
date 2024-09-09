"use client";

import PageLayout from "@/components/layout";
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageBreadcrumb from "@/components/page-breadcrumb";
import { Typography } from "@/components/ui/typography";
import { Heart, MessageSquareMore, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRatings from "react-star-ratings";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { CardType } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import Review from "./tabs/review";
import cardAction from "@/redux/modules/card/card.action";
import { selectCard } from "@/redux/modules/card/card.selector";
import ProductInfo from "./tabs/product-info";

export default function CardDetails() {
  const id = useParams().id as string;

  const { data, loading }: { loading: boolean; error: any; data: CardType } =
    useAppSelector(selectCard);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cardAction.getCardById(id));
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
                  <div className="p-1 w-56 h-36 border rounded-lg py-0 border-gray-300 shadow-sm">
                    <img
                      src={data.image?.url}
                      className="w-full h-full"
                      alt=""
                    />
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
                      <div className="flex items-center gap-4">
                        <Button
                          variant="link"
                          className="text-md flex items-center gap-1 text-[#FF492B] !p-0 w-max !m-0"
                        >
                          <span>
                            <Heart strokeWidth="3px" size="16px" />
                          </span>
                          Save
                        </Button>
                        <Button
                          variant="link"
                          className="text-md text-blue-500 flex gap-1 items-center !p-0 w-max !m-0"
                        >
                          <span>
                            <ThumbsUp strokeWidth="3px" size="16px" />
                          </span>
                          Like
                        </Button>
                        <Button
                          variant="link"
                          className="text-md text-black flex gap-1 items-center !p-0 w-max !m-0"
                        >
                          <span>
                            <MessageSquareMore strokeWidth="3px" size="16px" />
                          </span>
                          Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <Button>Contact {data.name}</Button>
                </div>
              </div>
              <div className="-my-5 mb-6">
                <Tabs defaultValue="productInformation" className="">
                  <div className="border-b border-gray-300">
                    <TabsList className="container w-full  max-w-lg ml-64">
                      <TabsTrigger
                        className="border-b-2"
                        value="productInformation"
                      >
                        General Information
                      </TabsTrigger>
                      <TabsTrigger
                        disabled
                        className="border-b-2"
                        value="services"
                      >
                        Services
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
}
