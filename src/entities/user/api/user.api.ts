import { apiInstance } from "../../../shared/api/axios";
import { ENDPOINTS } from "../../../shared/constants";
import { User } from "../model/types";

export const userApi = {
  async getSelf() {
    const { data } = await apiInstance.get<User>(ENDPOINTS.GET_SELF);
    return data;
  },
};
