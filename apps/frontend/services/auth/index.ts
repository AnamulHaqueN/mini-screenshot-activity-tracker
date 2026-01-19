import api from "@/http/axios";
import { ILogin, IRegister } from "@/types/auth";
import { ApiErrorShape } from "@/types/error";
import { User } from "@/types/user";

export const authService = {
  async register(data: IRegister) {
    console.log(data);
    const response = await api.post<ApiErrorShape>("/auth/register", data);
    return response.data;
  },

  async login({ email, password }: ILogin) {
    const response = await api.post<ApiErrorShape>("/auth/login", { email, password });
    return response.data;
  },

  async logout() {
    await api.delete("/auth/logout");
  },

  async me(): Promise<User | undefined> {
    const response = await api.get("/auth/me");
    return response.data.data;
  },
};
