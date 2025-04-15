export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const CONFIG_API = {
  AUTH: {
    LOGIN: `/auth/login`,
  },
  CHAT: {
    INDEX: `${process.env.NEXT_PUBLIC_BASE_URL_SOCKET}/chat`,
  },
  USER: {
    INDEX: "/users",
    ACCOUNT: "/auth/account",
  },
  TASK: "/tasks",
  PROJECT: "/projects",
};
