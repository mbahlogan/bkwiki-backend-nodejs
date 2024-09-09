"use client";
import React from "react";
import MapWrapper from "./map.wrapper";
import { ATMType } from "@/types";
import Details from "./details";
import { useSearchQuery } from "@/hooks/query";

export default function Map({ data }: { data: ATMType[] }) {
  const [query, setQuery] = useSearchQuery();

  const handleMarkerClick = (data: any) => {
    setQuery("current", data._id);
  };

  let currentMaker = data.find((maker) => maker._id === query.current);

  return (
    <div className="relative h-screen w-screen">
      <div className="w-[350px] h-screen absolute top-0 left-0 z-10 py-6 pl-6">
        <div className="bg-whit h-full w-full rounded-lg p-4 space-y-4">
          {currentMaker && (
            <Details
              data={currentMaker}
              onClick={() => {
                setQuery("current", "");
              }}
            />
          )}
        </div>
      </div>
      {data && <MapWrapper data={data} onMarkerClick={handleMarkerClick} />}
    </div>
  );
}
