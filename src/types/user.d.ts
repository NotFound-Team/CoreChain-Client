export type UserResponse = {
  _id: string;
  name: string;
  email: string;
  feedback?: [];
  role?: { _id: string; name: string };
  permissions: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type TDepartment = {
  _id: string;
  name: string;
};

export type TPosition = {
  _id: string;
  title: string;
};

export type TRole = {
  _id: string;
  name: string;
};

export type TFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  roleId: string;
  departmentId: string;
  positionId: string;
  // [key: string]: any;
};

export type TFormDataCreateUser = {
  name: string;
  email: string;
  password: string;
  role: string;
  employeeId: string;
  position: string;
  department: string;
};

export type CreateUserModalProps = {
  data: {
    open: boolean;
    loading: boolean;
    roles: TRole[];
    departments: TDepartment[];
    positions: TPosition[];
    handleSelectChange: (name: string, value: string) => void;
    handleClose: () => void;
    handleCreateUser: (e: React.FormEvent) => Promise<void>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: TFormDataCreateUser;
  };
};

export interface TParamsEmployee {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  male: boolean;
  personalPhoneNumber: string;
  nationality: string;
  permanentAddress: string;
  employeeId: string;
  department: {
    _id: string;
    name: string;
  };
  role: {
    _id: string;
    name: string;
  };
  createdAt: string;
  employeeContractCode: string;
  salary: number;
  allowances: number;
  netSalary: number;
  loansSupported: number;
  backAccountNumber: string;
  healthInsuranceCode: string;
  lifeInsuranceCode: string;
  healthCheckRecordCode: string[];
  medicalHistory: string;
  isActive: boolean;
}
