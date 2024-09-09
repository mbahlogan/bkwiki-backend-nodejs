"use client";
import Hero from "@/components/hero";
import PageLayout from "@/components/layout";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect } from "react";
import Features from "./features";
import Review from "./review";
import Claim from "./claim";
import About from "./about";
import atmAction from "@/redux/modules/atms/atm.action";
import bankAction from "@/redux/modules/bank/bank.action";
import { StringParam, useQueryParam } from "use-query-params";
import cardAction from "@/redux/modules/card/card.action";
import loanAction from "@/redux/modules/loan/loan.action";

export default function Home() {
  const dispatch = useAppDispatch();
  const [search = "banks", _] = useQueryParam("s", StringParam);

  const getData = (type: "banks" | "atm" | "cards" | "loans"  | any) => {
    switch (type) {
      case "atms":
        return dispatch(atmAction.getAtms());
      case "banks":
        return dispatch(bankAction.getBanks());
      case "cards":
        return dispatch(cardAction.getCards());
      case "loans":
        return dispatch(loanAction.getLoans());
    }
  };

  useEffect(() => {
    getData(search);
  }, [search]);

  return (
    <PageLayout>
      <Hero />
      <Features />
      <Review />
      <Claim />
    </PageLayout>
  );
}
