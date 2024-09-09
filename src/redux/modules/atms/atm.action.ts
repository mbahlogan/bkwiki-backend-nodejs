import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/api";

const getAtms = createAsyncThunk("atm/getAtms", async (params?: {}) => {
  return await apiClient("/atms", "GET", null, params);
});


export default { getAtms };
