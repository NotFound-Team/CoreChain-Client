import { TypeObject } from "@mui/material/styles/createPalette";
import { Status, Priority } from "./project";

const TObjectCreateBy = {
  _id: string,
  email: string,
};

export type TTask = {
  _id: string;
  name: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  assignedTo: {
    _id: string;
    email: string;
  };
  status: Status;
  priority: Priority;
  projectId: string;
  attachments: string[];
  createdAt: Date;
  createdBy: TypeObject;
  deletedAt: null;
  isDeleted: boolean;
  updatedAt: Date;
};
