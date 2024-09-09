import List from "@/components/list";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useAppSelector } from "@/redux/hooks";
import { selectAtms } from "@/redux/modules/atms/atm.selector";
import { selectBanks } from "@/redux/modules/bank/bank.selector";
import React from "react";
import { StringParam, useQueryParam } from "use-query-params";
import Bank from "./bank";
import ATMs from "./atm";
import { Skeleton } from "@/components/ui/skeleton";
import { selectCards } from "@/redux/modules/card/card.selector";
import { selectLoans } from "@/redux/modules/loan/loan.selector";
import Card from "./card";
import Loan from "./loan";
import Link from "next/link";

interface TabItem {
  value: string;
  name: string;
}

export default function Features() {
  const banks: any = useAppSelector(selectBanks);
  const atms: any = useAppSelector(selectAtms);
  const cards: any = useAppSelector(selectCards);
  const loans: any = useAppSelector(selectLoans);

  const getData = (type: "banks" | "atm" | "cards" | "loans" | any) => {
    switch (type) {
      case "atms":
        return atms;
      case "banks":
        return banks;
      case "cards":
        return cards;
      case "loans":
        return loans;
    }
  };

  const [search = "banks", setSearch] = useQueryParam("s", StringParam);

  const tabs: TabItem[] = [
    {
      name: "Banks",
      value: "banks",
    },
    {
      value: "atms",
      name: "ATMs",
    },
    {
      value: "cards",
      name: "Cards",
    },
    {
      value: "loans",
      name: "Bank loans",
    },
  ];
  

  const {data = [], loading} = getData(search)


  return (
    <section>
      <div className="py-10 xl:px-20 bg-white ">
        <div className="mx-auto max-w-7xl px-6 flex md:flex-row flex-col justify-center md:gap-x-24  ">

          <div className="flex flex-col md:w-1/2 lg:w-1/3 items-center md:items-start">
            <Typography size="mid" variant="title">
              Most popular <br /> Searches
            </Typography>
            <div className="space-y-0 mt-8">
              {tabs.map((item) => (
                <Button
                  variant="link"
                  key={item.value}
                  onClick={() => setSearch(item.value)}
                  className={` text-left w-full font-medium text-base hover:no-underline rounded-sm justify-start ${
                    search === item.value
                      ? "active border-2 border-primary text-primary"
                      : "!text-gray-600"
                  }`}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 lg:w-4/5 mx-auto items-center">
            <div className="flex justify-end">
              <Link href={"/"+search}>              
              <Button variant="link">
                See all {search}
              </Button>
              </Link>
            </div>


            {loading && <Skeleton className="w-full h-56 flex justify-center items-center">
              Loading
            </Skeleton>}
           {!loading && <div className="grid grid-cols-2 gap-5">
              <List
                data={data}
                renderer={(contentItem: any) => {
                  switch (search) {
                    case "atms":
                      return <ATMs {...contentItem} />
                    case "banks":
                      return <Bank {...contentItem} />
                    case "cards":
                      return <Card {...contentItem} />
                    case "loans":
                      return <Loan {...contentItem} />
                  }
                }}
              />
            </div>}
          </div>
        </div>
      </div>
    </section>
  );
}
