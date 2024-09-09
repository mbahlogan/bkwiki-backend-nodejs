"use client";

import List from "@/components/list";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { LoanType } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Typography } from "@/components/ui/typography";
import loanAction from "@/redux/modules/loan/loan.action";
import { selectLoans } from "@/redux/modules/loan/loan.selector";
import Loan from "../../home/loan";
import TabInfoContainer from "@/components/tab-info-container";

export default function Loans() {
  const loans: { data: LoanType[]; loading: boolean } =
    useAppSelector(selectLoans);
  const id = useParams().id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loanAction.getLoans({ org: id }));
  }, []);

  return (
    <TabInfoContainer title="Loans">
      {loans.loading ? (
        <div>
          <Skeleton className="w-full h-[400px]" />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          <List data={loans.data} renderer={(e) => <Loan {...e} />} />
        </div>
      )}

      {!loans.loading && loans.data.length === 0 && (
        <div className="flex justify-center items-center h-[200px]">
          <Typography>No Loan Available</Typography>
        </div>
      )}
    </TabInfoContainer>
  );
}
