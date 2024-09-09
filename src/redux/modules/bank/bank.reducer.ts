import { createReducer } from "@reduxjs/toolkit";
import bankAction from "./bank.action";

export const bankState = {
  banks: {
    loading: false,
    data: [],
    error: null,
  },
  bank: {
    loading: false,
    data: {},
    error: null,
  },
};

const bankReducer = createReducer(bankState, (builder) => {
  builder
    .addCase(bankAction.getBanks.pending, (state) => {
      state.banks.loading = true;
    })
    .addCase(bankAction.getBanks.fulfilled, (state, action) => {
      state.banks.data = action.payload.data;
      state.banks.loading = false;
    })
    .addCase(bankAction.getBanks.rejected, (state, action: any) => {
      state.banks.loading = false;
      state.banks.error = action.error;
    })
    .addCase(bankAction.getBankById.pending, (state) => {
      state.bank.loading = true;
    })
    .addCase(bankAction.getBankById.fulfilled, (state, action) => {
      state.bank.data = action.payload.data;
      state.bank.loading = false;
    })
    .addCase(bankAction.getBankById.rejected, (state, action: any) => {
      state.bank.loading = false;
      state.bank.error = action.error;
    });
});

export default bankReducer;
