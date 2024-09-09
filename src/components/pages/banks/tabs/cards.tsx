"use client";

import List from "@/components/list";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CardType } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import Card from "../../home/card";
import { selectCards } from "@/redux/modules/card/card.selector";
import cardAction from "@/redux/modules/card/card.action";
import { Typography } from "@/components/ui/typography";
import TabInfoContainer from "@/components/tab-info-container";

export default function Cards() {
  const cards: { data: CardType[]; loading: boolean } =
    useAppSelector(selectCards);
  const id = useParams().id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cardAction.getCards({ org: id }));
  }, []);

  return (
    <TabInfoContainer title="Cards">
      {cards.loading ? (
        <div>
          <Skeleton className="w-full h-[400px]" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          <List data={cards.data} renderer={(e) => <Card {...e} />} />
        </div>
      )}

      {!cards.loading && cards.data.length === 0 && (
        <div className="flex justify-center items-center h-[200px]">
          <Typography>No Card Available</Typography>
        </div>
      )}
    </TabInfoContainer>
  );
}
