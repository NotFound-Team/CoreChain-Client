
export type TReportEmployeeBase = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
};

export type TEmployeesDepartment = {
  department: string;
  employees: any[];
};

export type TEmployeesTurnover = {
  resignedEmployees: any[];
  newEmployees: any[];
};

export type TWorkingHours = {
  department: string;
  employees: (TReportEmployeeBase & {
    workingHours: number;
  })[];
};

export type TDayOff = {
  department: string;
  employees: (TReportEmployeeBase & {
    dayOff: number;
  })[];
};

export type TKPI = {
  department: string;
  employees: (TReportEmployeeBase & {
    kpi: number;
  })[];
};

export type TSalary = {
  department: string;
  employees: (TReportEmployeeBase & {
    salary: number;
    allowances: number;
    adjustments?: {
      reason: string;
      amount: number;
      createdAt?: string;
    }[];
    netSalary: number;
  })[];
  amount: number;
};
