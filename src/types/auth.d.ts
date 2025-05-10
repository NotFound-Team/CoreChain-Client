import { Dispatch, SetStateAction } from "react";

export interface UserLogin {
  username: string;
  password: string;
}
type RoleType = {
  id: string;
  name: string;
};
type User = {
  _id: string;
  avatar?: string;
  name: string;
  email: string;
  role: RoleType;
  permissions?: Array;
  token: string;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  login: (credentials: UserLogin) => Promise<void>;
  logout: () => void;
};
