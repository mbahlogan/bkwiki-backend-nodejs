import { createSelector } from '@reduxjs/toolkit';
const getAuthState = (state: any) => state.auth || {};


export const selectUser = createSelector(
  getAuthState,
  auth => auth.user
)
export const selectAuthError = createSelector(
  getAuthState,
  auth => auth.error
);
export const selectAuthLoading = createSelector(
  getAuthState,
  auth => auth.loading
);


