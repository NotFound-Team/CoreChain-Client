// -- Axios --
import axios, { AxiosRequestConfig } from "axios";
// -- Configs --
import { BASE_URL } from "@/configs/api";

// Tạo một instance Axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để tự động đính kèm token vào request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useFetch = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data: null,
  extraHeaders: Record<string, string> = {}
) => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      headers: {
        ...extraHeaders, // Thêm headers nếu có
      },
    };

    const response = await axiosInstance(config);
    return response.data; // Trả về dữ liệu thay vì toàn bộ response
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Request failed");
    }
    console.error("Unknown error");
    throw new Error("Unknown error occurred");
  }
};

export default useFetch;
