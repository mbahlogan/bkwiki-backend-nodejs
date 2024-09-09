import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/api";

const getBanks = createAsyncThunk("bank/getBanks", async () => {
  return await apiClient("/orgs");
});
const getBankById = createAsyncThunk("bank/getBankById", async (id: string) => {
  return await apiClient("/orgs/" + id);
});

export default { getBanks, getBankById };
