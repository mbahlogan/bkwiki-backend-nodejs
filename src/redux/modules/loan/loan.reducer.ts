import { createReducer } from "@reduxjs/toolkit";
import loanAction from "./loan.action";

export const loanState = {
  loans: {
    loading: false,
    data: [],
    error: null,
  },
  loan: {
    loading: false,
    data: {},
    error: null,
  },
};

const loanReducer = createReducer(loanState, (builder) => {
  builder
    .addCase(loanAction.getLoans.pending, (state) => {
      state.loans.loading = true;
    })
    .addCase(loanAction.getLoans.fulfilled, (state, action) => {
      state.loans.data = action.payload.data;
      state.loans.loading = false;
    })
    .addCase(loanAction.getLoans.rejected, (state, action: any) => {
      state.loans.loading = false;
      state.loans.error = action.error;
    })
    .addCase(loanAction.getLoanById.pending, (state) => {
      state.loan.loading = true;
    })
    .addCase(loanAction.getLoanById.fulfilled, (state, action) => {
      state.loan.data = action.payload.data;
      state.loan.loading = false;
    })
    .addCase(loanAction.getLoanById.rejected, (state, action: any) => {
      state.loan.loading = false;
      state.loan.error = action.error;
    });
});

export default loanReducer;
