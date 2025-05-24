// Enum cho priority và status
export enum Priority {
  Low = 1,
  Medium = 2,
  High = 3,
}

export enum Status {
  NotStarted = 1,
  InProgress = 2,
  Completed = 3,
}

export type Employee = {
  id: string;
  name: string;
};

export type TCreateProject = {
  _id?: string;
  name: string;
  description: string;
  teamMembers: Employee[];
  manager: string;
  attachments: Array<string>;
  department: string;
  tasks: string[];
  revenue: number;
  priority: number;
  status: number;
  startDate: Date | null;
  endDate: Date | null;
};

export type TProject = {
  _id: string;
  name: string;
  description: string;
  actualEndDate: Date;
  attachments: string[];
  createdAt: Date;
  deletedAt: Date | null;
  endDate: Date;
  expenses: number[];
  isDeleted: boolean;
  priority: Priority;
  progress: number;
  revenue: number;
  startDate: Date;
  status: Status;
  tasks: string[];
  teamMembers: string[];
  updatedAt?: Date;
  manager: {
    email: string;
    name: string;
    _id: string;
  };
  managerName?: string;
};
