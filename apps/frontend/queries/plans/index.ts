import { planService } from "@/services/plans";
import { useQuery } from "@tanstack/react-query";

export const usePlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: planService.getPlans,
    retry: false,
    staleTime: 1440 * 60 * 1000, // for 1 day no API call
  });
};
