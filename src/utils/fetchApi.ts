import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { BASE_URL, CONFIG_API } from "@/configs/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(`${BASE_URL}${CONFIG_API.AUTH.REFRESH}`, {
          withCredentials: true,
        });

        if (res.data?.accessToken) {
          const newToken = res.data.access_token;

          localStorage.setItem("token", newToken);

          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const fetchApi = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  data?: any,
  extraOptions: Omit<AxiosRequestConfig, "url" | "method" | "data"> = {}
) => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      ...extraOptions,
    };

    const response = await axiosInstance(config);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Request failed");
    }
    throw new Error("Unknown error occurred");
  }
};

export default fetchApi;
