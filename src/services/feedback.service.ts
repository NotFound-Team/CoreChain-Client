import { CONFIG_API } from "@/configs/api";
import fetchApi from "@/utils/fetchApi";
import { TCreateFeedback, TDecryptFeedbackRequest, TQueryFeedback } from "@/types/feedback";

/**
 * Create feedback
 * POST /feedback
 */
export const createFeedback = async (data: TCreateFeedback) => {
  try {
    return await fetchApi(CONFIG_API.FEEDBACK.INDEX, "POST", data);
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * Decrypt feedback
 * POST /feedback/decrypt/:id
 */
export const decryptFeedback = async (id: string, data: TDecryptFeedbackRequest) => {
  try {
    return await fetchApi(CONFIG_API.FEEDBACK.DECRYPT(id), "POST", data);
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * Get feedback list
 * GET /feedback
 */
export const getFeedbackList = async (params: TQueryFeedback) => {
  try {
    const query = new URLSearchParams(params as Record<string, string>).toString();

    return await fetchApi(`${CONFIG_API.FEEDBACK.INDEX}?${query}`, "GET");
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * Get feedback detail
 * GET /feedback/:id
 */
export const getFeedbackDetail = async (id: string) => {
  try {
    return await fetchApi(CONFIG_API.FEEDBACK.DETAIL(id), "GET");
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * Delete feedback
 * DELETE /feedback/:id
 */
export const deleteFeedback = async (id: string) => {
  try {
    return await fetchApi(CONFIG_API.FEEDBACK.DETAIL(id), "DELETE");
  } catch (error: any) {
    return error?.response?.data;
  }
};
