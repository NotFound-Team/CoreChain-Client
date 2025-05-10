import { User } from "@/types/auth";

type TPermission = {
  _id: string;
  name: string;
  apiPath: string;
  method: string;
  module: string;
};

// type TParams = {
//   permissions: Permission[];
// };

export function hasPermission(user: User | null, permissionName: string): boolean {
  if (!user?.permissions) return false;

  return user.permissions.some((perm: TPermission) => perm.name === permissionName);
}
