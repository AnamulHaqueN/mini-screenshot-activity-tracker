import api from "@/http/axios";
import { Plan } from "@/types";

export const planService = {
  async getPlans(): Promise<Plan[]> {
    const response = await api.get("/plans");
    return response.data.data;
  },
};
