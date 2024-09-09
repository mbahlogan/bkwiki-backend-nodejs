import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/api";

const getCards = createAsyncThunk("card/getCards", async (params?: {}) => {
  return await apiClient("/cards", "GET", null, params);
});

const getCardById = createAsyncThunk("card/getCardById", async (id: string) => {
  return await apiClient("/cards/" + id);
});


export default { getCards, getCardById };
