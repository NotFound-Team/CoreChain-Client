interface CreatedBy {
  _id: string;
  email: string;
}

export interface TPermission {
  _id: string;
  piPath: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  module?: string;
  name?: string;
  createdAt: string;
  createdBy: CreatedBy;
  deletedAt: string | null;
  isDeleted: boolean;
  name: string;
  updatedAt: string;
}
