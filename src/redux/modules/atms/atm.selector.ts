import { createSelector } from "@reduxjs/toolkit";

const getAtmState = (state: any) => state.atm || {};

export const selectAtms = createSelector(
  getAtmState,
  (state) => state.atms
);
