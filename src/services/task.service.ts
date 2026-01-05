import { CONFIG_API } from "@/configs/api";
import fetchApi from "@/utils/fetchApi";
import { TQueryTask } from "@/types/task";
// you help me refactor fetch projects same as getFeedbackList
/**
 * Get task list
 * GET /tasks
 */
export const getTaskList = async (params: TQueryTask) => {
  try {
    const query = new URLSearchParams(Object.entries(params).map(([key, value]) => [key, String(value)])).toString();

    return await fetchApi(`${CONFIG_API.TASK.INDEX}?${query}`, "GET");
  } catch (error: any) {
    return error?.response?.data;
  }
};
