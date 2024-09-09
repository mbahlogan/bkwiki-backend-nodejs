import { createReducer } from "@reduxjs/toolkit";
import cardAction from "./card.action";

export const cardState = {
  cards: {
    loading: false,
    data: [],
    error: null,
  },
  card: {
    loading: false,
    data: {},
    error: null,
  },
};

const cardReducer = createReducer(cardState, (builder) => {
  builder
    .addCase(cardAction.getCards.pending, (state) => {
      state.cards.loading = true;
    })
    .addCase(cardAction.getCards.fulfilled, (state, action) => {
      state.cards.data = action.payload.data;
      state.cards.loading = false;
    })
    .addCase(cardAction.getCards.rejected, (state, action: any) => {
      state.cards.loading = false;
      state.cards.error = action.error;
    })
    .addCase(cardAction.getCardById.pending, (state) => {
      state.card.loading = true;
    })
    .addCase(cardAction.getCardById.fulfilled, (state, action) => {
      state.card.data = action.payload.data;
      state.card.loading = false;
    })
    .addCase(cardAction.getCardById.rejected, (state, action: any) => {
      state.card.loading = false;
      state.card.error = action.error;
    });
});

export default cardReducer;
