

export type Task = {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  assignedTo: {
    _id: string;
    email: string;
  };
  status: "Not Started";
};
