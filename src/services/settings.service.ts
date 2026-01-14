import axios from "axios";
import { SettingsType } from "@/app/api/settings/schema";

const API_URL = "/api/settings";

export const settingsService = {
  getSettings: async (): Promise<SettingsType> => {
    const response = await axios.get(API_URL);
    return response.data.data;
  },

  updateSettings: async (data: Partial<SettingsType>): Promise<SettingsType> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : ""; // Basic assumption

    const response = await axios.patch(API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  },
};
