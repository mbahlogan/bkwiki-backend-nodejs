import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/api";

const getLoans = createAsyncThunk("loan/getLoans", async (params?: {}) => {
  return await apiClient("/loans", "GET", null, params);
});


const getLoanById = createAsyncThunk("loan/getLoanById", async (id: string) => {
  return await apiClient("/loans/" + id);
});


export default { getLoans, getLoanById };
