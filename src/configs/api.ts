export const BASE_URL = process.env.API_URL

const version = "v1";

export const CONFIG_API = {
  AUTH: {
    LOGIN: `${BASE_URL}/${version}/auth/login`
  }
}