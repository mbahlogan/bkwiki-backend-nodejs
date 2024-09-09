import { createSelector } from "@reduxjs/toolkit";

const getLoanState = (state: any) => state.loan || {};

export const selectLoans = createSelector(getLoanState, (state) => state.loans);
export const selectLoan = createSelector(getLoanState, (state) => state.loan);
