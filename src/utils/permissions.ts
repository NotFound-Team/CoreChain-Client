type Permission = {
  _id: string;
  name: string;
  apiPath: string;
  method: string;
  module: string;
};

type User = {
  permissions: Permission[];
};

export function hasPermission(user: User | null, permissionName: string): boolean {
  if (!user?.permissions) return false;

  return user.permissions.some((perm) => perm.name === permissionName);
}
