"use client";
import PageLayout from "@/components/layout";
import List from "@/components/list";
import Card from "@/components/pages/home/card";
import { Typography } from "@/components/ui/typography";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import cardAction from "@/redux/modules/card/card.action";
import { selectCards } from "@/redux/modules/card/card.selector";
import React, { useEffect } from "react";

export default function CardsPage() {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectCards);
  useEffect(() => {
    dispatch(cardAction.getCards());
  }, []);

  return (
    <PageLayout>
      <div className="container py-10">
        <Typography variant="title" size="md">Cards in Cameroon</Typography>

        <div className="grid grid-cols-3 gap-5 mt-4">
          <List
            data={cards.data}
            renderer={(contentItem: any) => <Card {...contentItem} />}
          />
        </div>
      </div>
    </PageLayout>
  );
}
