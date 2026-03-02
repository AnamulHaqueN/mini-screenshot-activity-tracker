import api from "@/http/axios"
import {IPlans} from "@/types/plan"

export const planService = {
   async getPlans(): Promise<IPlans[]> {
      const response = await api.get("/api/plans")
      return response.data.data
   },
}
