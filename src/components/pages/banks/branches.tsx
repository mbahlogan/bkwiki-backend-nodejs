"use client";

import List from "@/components/list";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import atmAction from "@/redux/modules/atms/atm.action";
import { selectAtms } from "@/redux/modules/atms/atm.selector";
import { ATMType } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import ATMs from "../home/atm";
import dynamic from "next/dynamic";
import TabInfoContainer from "@/components/tab-info-container";

const Map = dynamic(() => import("@/components/map"), { ssr: false });

export default function Branches() {
  const atms: { data: ATMType[]; loading: boolean } =
    useAppSelector(selectAtms);
  const id = useParams().id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(atmAction.getAtms({ org: id }));
  }, []);

  return (
      <TabInfoContainer title="Branches">
        {atms.loading ? (
          <div>
            <Skeleton className="w-full h-[400px]" />
          </div>
        ) : (
          <div className="">
            <div className="border border-gray-300 overflow-hidden rounded flex-1">
              {atms.data.length > 0 && <Map data={atms.data} />}
            </div>
          </div>
        )}
      </TabInfoContainer>
  );
}
