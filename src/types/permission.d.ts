type Permission = {
  piPath: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  module: string;
  name: string;
  _id: string;
};

type UpdatedBy = {
  email: string;
};

type Role = {
  _id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  updatedBy: UpdatedBy;
};
