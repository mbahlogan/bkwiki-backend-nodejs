import Comment from "@/components/comment";
import Description from "@/components/description";
import Fieldset from "@/components/fieldset";
import PricePlan from "@/components/price-plan";
import ProductDetail from "@/components/product-detail";
import ProductMediaCarousel from "@/components/product-media-carousel";
import ProductReview from "@/components/product-review";
import TabInfoContainer from "@/components/tab-info-container";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import VideoReview from "@/components/video-review";
import { CardType, LoanType } from "@/types";
import { AppWindowMac, Gem, Globe, MessageCircle } from "lucide-react";
import React from "react";

export default function ProductInfo(props: LoanType) {
  
  return (
    <>
      <TabInfoContainer title={`${props.name} Reviews & Details`}>
        <Fieldset title={`${props.name} Overview`}>
          <div className="p-6">
            <Description title={`About ${props.name}?`}>
              {props.description}
            </Description>

            <div className="border-t border-gray-300 mt-6 py-5">
              <Typography>{props.name} Details</Typography>

              <div className="pt-2">
                <div className="flex pb-2">
                  <ProductDetail
                    title="Bank Website"
                    desc={props.name}
                    url="https://www.g2.com"
                    icon={<AppWindowMac />}
                  />
                  <ProductDetail
                    title="Languages Supported"
                    desc="English"
                    icon={<Globe />}
                  />
                </div>
                <ProductDetail
                  title="Discussions"
                  desc={`${props.name} Community`}
                  url="https://www.g2.com/"
                  icon={<MessageCircle />}
                />
              </div>
            </div>

            <div className="border-t border-gray-300 mt-6 py-5">
              <Typography>Bank Details</Typography>

              <div className="py-2">
                <div className="flex pb-2">
                  <ProductDetail title="Bank Name" desc={props.organisation?.localName} icon={<Gem />} />
                  <ProductDetail
                    title="Languages Supported"
                    desc="English"
                    icon={<Globe />}
                  />
                </div>
              </div>
            </div>
          </div>
        </Fieldset>
      </TabInfoContainer>

      <TabInfoContainer title="Recent Trello Reviews">
        <div className="grid grid-cols-3 gap-5">
          <ProductReview />
          <ProductReview />
          <ProductReview />
        </div>
      </TabInfoContainer>

      {/* <TabInfoContainer>
        <Fieldset title="Trello Pricing">
          <div className="grid grid-cols-4 gap-5 p-7">
            <PricePlan  />
            <PricePlan />
            <PricePlan />
            <PricePlan />
          </div>
        </Fieldset>
      </TabInfoContainer> */}

      <TabInfoContainer title="Trello Media">
        <div className="">
          <ProductMediaCarousel />
        </div>
      </TabInfoContainer>

      <TabInfoContainer>
        <Fieldset title="Video Reviews">
          <div className="p-7 space-y-4">
            <div className="grid grid-cols-3 gap-6">
              <VideoReview />
              <VideoReview />
              <VideoReview />
            </div>

            <Button>See all video reviews</Button>
          </div>
        </Fieldset>
      </TabInfoContainer>
      <TabInfoContainer title="Reviews">
        <div className="space-y-8">
          <Comment />
        </div>
      </TabInfoContainer>
    </>
  );
}
