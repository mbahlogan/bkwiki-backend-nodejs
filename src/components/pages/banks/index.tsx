"use client";

import PageLayout from "@/components/layout";
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "./overview";
import PageBreadcrumb from "@/components/page-breadcrumb";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import bankAction from "@/redux/modules/bank/bank.action";
import { Typography } from "@/components/ui/typography";
import FilterSelect from "@/components/filter-select";
import List from "@/components/list";
import ProductCard from "@/components/product-card";
import { selectBanks } from "@/redux/modules/bank/bank.selector";
import { BankType } from "@/types";
import Bank from "../home/bank";

export default function Banks() {
  const dispatch = useAppDispatch();
  const banks = useAppSelector(selectBanks);
  useEffect(() => {
    dispatch(bankAction.getBanks());
  }, []);
  return (
    <PageLayout>
      {/* <Tabs defaultValue="overview" className="w-full">
        <div className="border-b-2 shadow-sm pt-4">
          <div className="container">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rated">Highest Rated</TabsTrigger>
              <TabsTrigger value="ease">Easiest to Use</TabsTrigger>
              <TabsTrigger value="free">Free</TabsTrigger>
              <TabsTrigger value="resource">Resources</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="overview">
          <div className="container py-4">
            <PageBreadcrumb />
          </div>
          <Overview />
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs> */}


<div className="container py-10">
      <Typography size="mid">Compare Banks in Cameroon</Typography>
      <div className="mt-4">
        <Typography size="sm">Banks in Cameroon User Satisfaction</Typography>
        <Typography size="xs" variant="paragraph">
          "Has the product been a good partner in doing business?", "Application
          Deployment", "Database Management", and "Networking" are the top four
          factors that positively impact user satisfaction for Cloud Platform as
          a Service (PaaS) products. These factors are determined by an
          algorithm that selects the attributes that are most likely to predict
          user satisfaction within this category.
        </Typography>
      </div>

      <div className="py-6 flex items-center gap-6 hidden">
        <FilterSelect />
        <FilterSelect />
        <FilterSelect />
      </div>

      {!banks.loading && (
        <div className="mt-4 gap-10 grid grid-cols-3">
          <List
            data={banks.data}
            renderer={(d: BankType) => <Bank {...d} />}
          />
        </div>
      )}

      {banks.loading && (
        <div className=" mt-4 space-y-10">
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
        </div>
      )}
    </div>

    </PageLayout>
  );
}
