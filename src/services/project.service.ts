import { CONFIG_API } from "@/configs/api";
import fetchApi from "@/utils/fetchApi";
import { TQueryProject } from "@/types/project";
// you help me refactor fetch projects same as getFeedbackList
/**
 * Get project list
 * GET /projects
 */
export const getProjectList = async (params: TQueryProject) => {
  try {
    const query = new URLSearchParams(Object.entries(params).map(([key, value]) => [key, String(value)])).toString();

    return await fetchApi(`${CONFIG_API.PROJECT.INDEX}?${query}`, "GET");
  } catch (error: any) {
    return error?.response?.data;
  }
};
