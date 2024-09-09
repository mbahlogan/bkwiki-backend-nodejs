import { Typography } from "@/components/ui/typography";
import React from "react";
import FilterSelect from "@/components/filter-select";
import ProductCard from "@/components/product-card";
import { useAppSelector } from "@/redux/hooks";
import { selectBanks } from "@/redux/modules/bank/bank.selector";
import List from "@/components/list";
import { BankType } from "@/types";

export default function Overview() {
  const banks = useAppSelector(selectBanks);
  return (
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

      <div className="py-6 flex items-center gap-6">
        <FilterSelect />
        <FilterSelect />
        <FilterSelect />
      </div>

      <div>
        <Typography variant="paragraph" size="md">
          <strong>15</strong> Listings in Cloud Platform as a Service (PaaS)
          Available
        </Typography>
      </div>

      {!banks.loading && (
        <div className="mt-4 space-y-6">
          <List
            data={banks.data}
            renderer={(d: BankType) => <ProductCard {...d} />}
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
  );
}
