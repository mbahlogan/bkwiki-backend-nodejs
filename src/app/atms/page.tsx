"use client";

import Map from "@/components/map";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import atmAction from "@/redux/modules/atms/atm.action";
import { selectAtms } from "@/redux/modules/atms/atm.selector";
import React, { useEffect } from "react";

export default function ATMPage() {
  const dispatch = useAppDispatch();
  const atms = useAppSelector(selectAtms);
  useEffect(() => {
    dispatch(atmAction.getAtms());
  }, []);

  return (
    <>
      <div className="">
        {atms.loading ? (
          <div>
            <Skeleton className="w-full h-[400px]" />
          </div>
        ) : (
          <div className="h-screen">
            {atms.data.length > 0 && <Map data={atms.data} />}
          </div>
        )}
      </div>
    </>
  );
}
