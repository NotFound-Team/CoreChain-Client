import { CONFIG_API } from "@/configs/api";
import fetchApi from "@/utils/fetchApi";
import { TSalaryAdvance, TUpdatePersonnel, TQueryPersonnelSalary } from "@/types/personnel";

/**
 * ======================
 * SALARY
 * ======================
 */

/**
 * Calculate salary
 * GET /personnel/salary/calculate/:id
 */
export const calculateSalary = async (id: string) => {
  try {
    return await fetchApi(CONFIG_API.PERSONNEL.SALARY_CALCULATE(id), "GET");
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * Salary advance
 * POST /personnel/salary
 */
export const salaryAdvance = async (data: TSalaryAdvance) => {
  try {
    return await fetchApi(CONFIG_API.PERSONNEL.SALARY_ADVANCE, "POST", data);
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * Approve salary advance
 * POST /personnel/salary/approve/:id
 */
export const approveSalaryAdvance = async (id: string) => {
  try {
    return await fetchApi(CONFIG_API.PERSONNEL.SALARY_APPROVE(id), "POST");
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * Get salary detail
 * GET /personnel/salary/:id
 */
export const getSalaryDetail = async (id: string) => {
  try {
    return await fetchApi(CONFIG_API.PERSONNEL.SALARY_DETAIL(id), "GET");
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * Get salary list
 * GET /personnel/salary
 */
export const getSalaryList = async (params: TQueryPersonnelSalary) => {
  try {
    const query = new URLSearchParams(params as Record<string, string>).toString();

    return await fetchApi(`${CONFIG_API.PERSONNEL.SALARY_LIST}?${query}`, "GET");
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * ======================
 * KPI
 * ======================
 */

/**
 * Calculate KPI
 * GET /personnel/kpi/:id
 */
export const calculateKpi = async (id: string) => {
  try {
    return await fetchApi(CONFIG_API.PERSONNEL.KPI_CALCULATE(id), "GET");
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * ======================
 * PERSONNEL ADJUSTMENT
 * ======================
 */

/**
 * Add adjustment
 * POST /personnel/adjustments/:id
 */
export const addPersonnelAdjustment = async (id: string, data: TUpdatePersonnel) => {
  try {
    return await fetchApi(CONFIG_API.PERSONNEL.ADJUSTMENT(id), "POST", data);
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * ======================
 * WORKING HOURS
 * ======================
 */

/**
 * Update working hours
 * PATCH /personnel/working-hours/:id
 */
export const updateWorkingHours = async (id: string, data: { workingHours: number }) => {
  try {
    return await fetchApi(CONFIG_API.PERSONNEL.WORKING_HOURS(id), "PATCH", data);
  } catch (error: any) {
    return error?.response?.data;
  }
};
