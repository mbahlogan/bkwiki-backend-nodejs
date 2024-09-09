"use client";
import apiClient from "@/api";
import { setLocalUser } from "@/helpers/auth";
import createApiRequestAction from "@/redux/createApiRequestAction";
import { createAsyncThunk } from "@reduxjs/toolkit";

const signInUser: any = createAsyncThunk(
    "auth/signInUser",
    async (data?: any) => {
        const response = await apiClient("/register", "POST", data);
        const user = {
            id: response.data.id,
            email: data.email
        }
        if (response.success) {
            setLocalUser({ client: user })
            return {
                redirectUrl: "/auth/verify",
            };
        }
        return response;
    }
);

const loginUser: any = createAsyncThunk(
    "auth/loginUser",
    async (data?: any) => {
        const response = await apiClient("/login", "POST", data);
        if (response.success) {
            setLocalUser(response.data)
            return {
                redirectUrl: "/",
            };
        }
        return response;
    }
);

const verifyUser: any = createAsyncThunk(
    "auth/verifyUser",
    async (data?: any) => {
        const { id, ...body } = data
        const response = await apiClient(`/verify/${id}`, "PUT", body);
        if (response.success) {
          return {
            redirectUrl: "/auth/account-created",
          };
        }

        return response;
    }
);

const logoutUser = createApiRequestAction("auth/logoutUser", async () => {
    return {
        redirectUrl: "/auth/sign-in",
    };
});



export default {
    signInUser,
    loginUser,
    verifyUser,
    logoutUser,
};
