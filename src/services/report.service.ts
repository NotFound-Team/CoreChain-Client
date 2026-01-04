import { CONFIG_API } from "@/configs/api";
import fetchApi from "@/utils/fetchApi";
import { TEmployeesDepartment, TEmployeesTurnover, TWorkingHours, TDayOff, TKPI, TSalary } from "@/types/report";

/**
 * ======================
 * EMPLOYEES
 * ======================
 */

/**
 * Employees by department
 * GET /reports/employees
 */
export const getEmployeesReport = async () => {
  try {
    return await fetchApi<TEmployeesDepartment[]>(CONFIG_API.REPORT.EMPLOYEES, "GET");
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * Employees turnover
 * GET /reports/employees-turnover
 */
export const getEmployeesTurnoverReport = async () => {
  try {
    return await fetchApi<TEmployeesTurnover>(CONFIG_API.REPORT.EMPLOYEES_TURNOVER, "GET");
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
 * Working hours report
 * GET /reports/working-hours
 */
export const getWorkingHoursReport = async () => {
  try {
    return await fetchApi<TWorkingHours[]>(CONFIG_API.REPORT.WORKING_HOURS, "GET");
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * ======================
 * DAY OFF
 * ======================
 */

/**
 * Day off report
 * GET /reports/day-off
 */
export const getDayOffReport = async () => {
  try {
    return await fetchApi<TDayOff[]>(CONFIG_API.REPORT.DAY_OFF, "GET");
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
 * KPI report
 * GET /reports/kpi
 */
export const getKpiReport = async () => {
  try {
    return await fetchApi<TKPI[]>(CONFIG_API.REPORT.KPI, "GET");
  } catch (error: any) {
    return error?.response?.data;
  }
};

/**
 * ======================
 * SALARY
 * ======================
 */

/**
 * Salary report
 * GET /reports/salary
 */
export const getSalaryReport = async () => {
  try {
    return await fetchApi<TSalary[]>(CONFIG_API.REPORT.SALARY, "GET");
  } catch (error: any) {
    return error?.response?.data;
  }
};
