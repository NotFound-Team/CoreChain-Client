import { IPagination } from "./common";
import { Status, Priority } from "./project";

const TObjectCreateBy = {
  _id: string,
  email: string,
};

export type TCreateTask = {
  name: string;
  title: string;
  description: string;
  assignedTo: string;
  projectId: string;
  priority: Priority;
  status: Status;
  startDate: Date | null;
  dueDate: Date | null;
};

export type TTask = {
  _id: string;
  name: string;
  title: string;
  description: string;
  startDate: Date | null;
  dueDate: Date | null;
  assignedTo:
    | {
        _id: string;
        email: string;
      }
    | string;
  status: Status;
  priority: Priority;
  projectId: string;
  attachments?: string[];
  createdAt: Date;
  createdBy: object;
  deletedAt?: Date | null;
  isDeleted: boolean;
  updatedAt: Date;
};

export type TQueryTask = Partial<TTask> & IPagination;
