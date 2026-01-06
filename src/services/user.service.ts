import { CONFIG_API } from "@/configs/api";
import { TQueryUser } from "@/types/user";
import fetchApi from "@/utils/fetchApi";
// you help me refactor fetch projects same as getFeedbackList
/**
 * Get user list
 * GET /users
 */
export const getUserList = async (params: TQueryUser) => {
  try {
    const query = new URLSearchParams(Object.entries(params).map(([key, value]) => [key, String(value)])).toString();

    return await fetchApi(`${CONFIG_API.USER.INDEX}?${query}`, "GET");
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const getUserDetail = async (id: string) => {
  try {
    return await fetchApi(`${CONFIG_API.USER.DETAIL(id)}`, "GET");
  } catch (error: any) {
    return error?.response?.data;
  }
};
