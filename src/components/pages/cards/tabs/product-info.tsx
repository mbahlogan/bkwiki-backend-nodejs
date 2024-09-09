import Comment from "@/components/comment";
import Description from "@/components/description";
import Fieldset from "@/components/fieldset";
import List from "@/components/list";
import PricePlan from "@/components/price-plan";
import ProductDetail from "@/components/product-detail";
import ProductMediaCarousel from "@/components/product-media-carousel";
import ProductReview from "@/components/product-review";
import TabInfoContainer from "@/components/tab-info-container";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import VideoReview from "@/components/video-review";
import { CardType } from "@/types";
import {
  AppWindowMac,
  Check,
  CircleDollarSign,
  CreditCard,
  Gem,
  Globe,
  Landmark,
  MessageCircle,
  Network,
} from "lucide-react";
import React from "react";

export default function ProductInfo(props: CardType) {
  console.log(props);

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
                    title="Name"
                    desc={props.name}
                    icon={<CreditCard />}
                  />
                  <ProductDetail
                    title="Issuer"
                    desc={props.organisation?.name}
                    icon={<Landmark />}
                  />
                </div>
                <div className="flex pb-2">
                  <ProductDetail
                    title="Network"
                    desc={"VISA"}
                    icon={<Network />}
                  />
                  <ProductDetail
                    title="Recharge Fee"
                    desc={"500 XAF"}
                    icon={<CircleDollarSign />}
                  />
                </div>
              </div>
            </div>
          </div>
        </Fieldset>
        <br />

        <div className="grid grid-cols-4 gap-5">
          <Fieldset title="Features">
            <div className="p-6 space-y-2">
              <List
                data={props.features}
                renderer={(feature) => {
                  return (
                    <div className="flex items-center gap-2">
                      <Check className="text-green-500" />
                      <span>{feature}</span>
                    </div>
                  );
                }}
              />

              <Typography>Additional Features</Typography>

              <List
                data={props.additionalFeatures}
                renderer={(feature) => {
                  return (
                    <div className="flex items-center gap-2">
                      <Check className="text-green-500" />
                      <span>{feature}</span>
                    </div>
                  );
                }}
              />
            </div>
          </Fieldset>
          <Fieldset title="Services">
            <div className="p-6 space-y-2">
              <List
                data={props.services}
                renderer={(feature) => {
                  return (
                    <div className="flex items-center gap-2">
                      <Check className="text-green-500" />
                      <span>{feature}</span>
                    </div>
                  );
                }}
              />
            </div>
          </Fieldset>
          <Fieldset title="Eligebility">
            <div className="p-6 space-y-2">
              <List
                data={props.eligeble}
                renderer={(feature) => {
                  return (
                    <div className="flex items-center gap-2">
                      <Check className="text-green-500" />
                      <span>{feature}</span>
                    </div>
                  );
                }}
              />
            </div>
          </Fieldset>
          <Fieldset title="Steps To Apply">
            <div className="p-6 space-y-2">
              <List
                data={props.stepsToApply}
                renderer={(feature) => {
                  return (
                    <div className="flex items-center gap-2">
                      <Check className="text-green-500" />
                      <span>{feature}</span>
                    </div>
                  );
                }}
              />
            </div>
          </Fieldset>
        </div>
      </TabInfoContainer>

      {/* <TabInfoContainer title="Recent Trello Reviews">
        <div className="grid grid-cols-3 gap-5">
          <ProductReview />
          <ProductReview />
          <ProductReview />
        </div>
      </TabInfoContainer> */}

      {/* <TabInfoContainer>
        <Fieldset title="Trello Pricing">
          <div className="grid grid-cols-4 gap-5 p-7">
            <PricePlan title="Free" price="$1000" />
          </div>
        </Fieldset>
      </TabInfoContainer> */}

      {/* <TabInfoContainer title="Trello Media">
        <div className="">
          <ProductMediaCarousel />
        </div>
      </TabInfoContainer> */}

      {/* <TabInfoContainer>
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
      </TabInfoContainer> */}
      {/* <TabInfoContainer title="Reviews">
        <div className="space-y-8">
          <Comment />
        </div>
      </TabInfoContainer> */}
    </>
  );
}
