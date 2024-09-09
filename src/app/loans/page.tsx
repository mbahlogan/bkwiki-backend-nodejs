"use client";
import PageLayout from "@/components/layout";
import List from "@/components/list";
import ATMs from "@/components/pages/home/atm";
import Loan from "@/components/pages/home/loan";
import { Typography } from "@/components/ui/typography";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import loanAction from "@/redux/modules/loan/loan.action";
import { selectLoans } from "@/redux/modules/loan/loan.selector";
import React, { useEffect } from "react";

export default function ATMPage() {
  const dispatch = useAppDispatch();
  const loans = useAppSelector(selectLoans);
  useEffect(() => {
    dispatch(loanAction.getLoans());
  }, []);

  return (
    <PageLayout>
      <div className="container py-10">
        <Typography variant="title" size="md">Loans in Cameroon</Typography>

        <div className="grid grid-cols-3 gap-5 mt-4">
          <List
            data={loans.data}
            renderer={(contentItem: any) => <Loan {...contentItem} />}
          />
        </div>
      </div>
    </PageLayout>
  );
}
