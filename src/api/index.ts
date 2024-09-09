import { MethodType } from "@/types";
import axios from "axios";

const apiClient = async (
  url: string,
  method?: MethodType,
  data?: any,
  params?: any
) => {
  try {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };

    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASEURL;

    const response = await axios({ method, data, url, params, headers });

    if (!response.data.success) {
      return Promise.reject(response.data);
    }
    return Promise.resolve(response.data);
  } catch (error: any) {
    return Promise.reject(error.message);
  }
};

const getToken = () => {
  return localStorage.getItem("token");
};

export default apiClient;
