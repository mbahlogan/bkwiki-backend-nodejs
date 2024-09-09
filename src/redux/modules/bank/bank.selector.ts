import { createSelector } from "@reduxjs/toolkit";

const getBankState = (state: any) => state.bank || {};

export const selectBanks = createSelector(
  getBankState,
  (state) => state.banks
);


export const selectBank = createSelector(
  getBankState,
  (state) => state.bank
);
