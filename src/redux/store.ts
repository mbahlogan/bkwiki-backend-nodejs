import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore, combineReducers } from "@reduxjs/toolkit";
import { counterSlice } from "../lib/features/counter/counterSlice";
import { quotesApiSlice } from "../lib/features/quotes/quotesApiSlice";
import redirectMiddleware from "./middlewares/redirectMiddleware";
import authReducer from "./modules/auth/authReducer";
import bankReducer from "./modules/bank/bank.reducer";
import atmReducer from "./modules/atms/atm.reducer";
import cardReducer from "./modules/card/card.reducer";
import loanReducer from "./modules/loan/loan.reducer";


const rootReducer = combineSlices(counterSlice, quotesApiSlice);

export type RootState = ReturnType<typeof rootReducer>;
export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      auth: authReducer,
      bank: bankReducer,
      atm: atmReducer,
      card: cardReducer,
      loan: loanReducer,
    }),
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(redirectMiddleware);
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
