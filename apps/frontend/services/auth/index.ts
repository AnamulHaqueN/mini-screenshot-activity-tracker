import api from "@/http/axios";
import { IForgotPassword, ILogin, IRegister, IResetPassword } from "@/types/auth";
import { ApiErrorShape, LoginResponse } from "@/types/error";
import { User } from "@/types/user";

export const authService = {
  async register(data: IRegister) {
    console.log(data);
    const response = await api.post<ApiErrorShape>("/api/auth/register", data);
    return response.data;
  },

  async login({ email, password }: ILogin) {
    const response = await api.post<LoginResponse | ApiErrorShape>("/api/auth/login", { email, password });
    return response.data;
  },

  async logout() {
    await api.delete("/api/auth/logout");
  },

  async me(): Promise<User | undefined> {
    const response = await api.get("/api/auth/me");
    return response.data.data;
  },

  async forgotPassword(data: IForgotPassword) {
    const response = await api.post("/api/auth/forgot-password", data);
    return response.data;
  },

  async resetPassword(data: IResetPassword) {
    const response = await api.post("/api/auth/reset-password", data);
    return response.data;
  },
};
