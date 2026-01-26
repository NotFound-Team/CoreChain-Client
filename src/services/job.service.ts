import { CONFIG_API } from "@/configs/api";
import axios from "axios";

export async function getPublicJobs(params: any) {
  const response = await axios.get(CONFIG_API.JOB.PUBLIC.INDEX, {
    params,
  });

  return response.data;
}
