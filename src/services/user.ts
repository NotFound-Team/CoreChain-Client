import { CONFIG_API } from "@/configs/api";
import { TParamsEmployee } from "@/types/user";
import fetchApi from "@/utils/fetchApi";

export const updateUser = async (data: TParamsEmployee) => {
  const { id, ...rests } = data;
  try {
    const res = await fetchApi(`${CONFIG_API.USER.INDEX}/${id}`, "PATCH", rests);
    return res;
  } catch (error: any) {
    return error?.response?.data;
  }
};