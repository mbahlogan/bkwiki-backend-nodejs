import { createSelector } from "@reduxjs/toolkit";

const getCardState = (state: any) => state.card || {};

export const selectCards = createSelector(getCardState, (state) => state.cards);

export const selectCard = createSelector(
    getCardState,
    (state) => state.card
  );