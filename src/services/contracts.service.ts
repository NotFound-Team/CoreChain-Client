import { CONFIG_API } from "@/configs/api";
import fetchApi from "@/utils/fetchApi";
import { TCreateContract, TUpdateContract, TQueryContracts } from "@/types/contract";

/**
 * Create contract
 * POST /contracts
 */
export const createContract = async (data: TCreateContract) => {
  try {
    const res = await fetchApi(CONFIG_API.CONTRACT.INDEX, "POST", data);
    return res;
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * Get contracts with pagination & query
 * GET /contracts?current=1&pageSize=10&...
 */
export const getContracts = async (params: TQueryContracts) => {
  try {
    const query = new URLSearchParams(params as Record<string, string>).toString();

    const res = await fetchApi(`${CONFIG_API.CONTRACT.INDEX}?${query}`, "GET");
    return res;
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * Get contract detail
 * GET /contracts/:id
 */
export const getContractDetail = async (id: string) => {
  try {
    const res = await fetchApi(CONFIG_API.CONTRACT.DETAIL(id), "GET");
    return res;
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * Update contract
 * PATCH /contracts/:id
 */
export const updateContract = async (id: string, data: TUpdateContract) => {
  try {
    const res = await fetchApi(CONFIG_API.CONTRACT.DETAIL(id), "PATCH", data);
    return res;
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * Delete contract
 * DELETE /contracts/:id
 */
export const deleteContract = async (id: string) => {
  try {
    const res = await fetchApi(CONFIG_API.CONTRACT.DETAIL(id), "DELETE");
    return res;
  } catch (error: any) {
    return error?.response?.data;
  }
};
