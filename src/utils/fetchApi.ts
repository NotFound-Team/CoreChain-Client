// -- Axios --
import axios, { AxiosRequestConfig } from "axios";
// -- Configs --
import { BASE_URL } from "@/configs/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const fetchApi = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: T,
  extraOptions: Omit<AxiosRequestConfig, "url" | "method" | "data"> = {}
) => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      // ...(data ? { data } : {}),
      data,
      ...extraOptions,
    };

    const response = await axiosInstance(config);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Request failed");
    }
    console.error("Unknown error");
    throw new Error("Unknown error occurred");
  }
};

export default fetchApi;
