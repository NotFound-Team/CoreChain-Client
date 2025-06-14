export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const CONFIG_API = {
  AUTH: {
    LOGIN: `/auth/login`,
    LOGOUT: `/auth/logout`,
    REFRESH: `/auth/refresh`,
  },
  CHAT: {
    INDEX: `${process.env.NEXT_PUBLIC_BASE_URL_SOCKET}/chat`,
  },
  USER: {
    INDEX: "/users",
    ACCOUNT: "/auth/account",
    PRIVATE: "/users/private",
  },
  TASK: "/tasks",
  PROJECT: "/projects",
  PERMISSION: "/permissions",
  ROLE: "/roles",
  FILE: "/files/upload",
  DEPARTMENT: "/departments",
  POSITION: "/positions",
  FEEDBACK: "/feedback",
};
