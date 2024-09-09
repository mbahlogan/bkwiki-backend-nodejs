"use client"
import React from "react";
import { QueryParamProvider } from "use-query-params";
import NextAdapterApp from "next-query-params/app";

export default function QueryContextProvider({ children }: { children: any }) {
  return (
    <QueryParamProvider adapter={NextAdapterApp}>{children}</QueryParamProvider>
  );
}
