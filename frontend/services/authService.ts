import api from "@/lib/axios";
import { ILogin, IRegister } from "@/types/auth";
import { User } from "@/types/user";

export const authService = {
  async register(data: IRegister) {
    try {
      const response = await api.post("/auth/register", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  async login({ email, password }: ILogin) {
    try {
      console.log(email, password);
      const response = await api.post("/auth/login", { email, password });
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },

  async logout() {
    try {
      await api.delete("/auth/logout");
    } catch (error: any) {
      throw new Error(error);
    }
  },

  async me(): Promise<User | undefined> {
    try {
      const response = await api.get("/auth/me");
      return response.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
