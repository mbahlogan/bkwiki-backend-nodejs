import { createReducer } from "@reduxjs/toolkit";
import atmAction from "./atm.action";

export const atmState = {
  atms: {
    loading: false,
    data: [],
    error: null,
  },
};

const atmReducer = createReducer(atmState, (builder) => {
  builder
    .addCase(atmAction.getAtms.pending, (state) => {
      state.atms.loading = true;
    })
    .addCase(atmAction.getAtms.fulfilled, (state, action) => {
      state.atms.data = action.payload.data;
      state.atms.loading = false;
    })
    .addCase(atmAction.getAtms.rejected, (state, action: any) => {
      state.atms.loading = false;
      state.atms.error = action.error;
    })
});

export default atmReducer;
