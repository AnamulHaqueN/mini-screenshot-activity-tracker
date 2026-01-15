import { authService } from "@/services/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: authService.me,
    retry: false,
    staleTime: 5 * 60 * 1000, // for 5 min no API call
  });
};

export const useLogin = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    retry: false,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] }); // refetch API "me"
    },
    onError: (error: any) => {
      console.error(error.response?.data?.message || "Login failed");
    },
  });
};

export const useLogout = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    retry: false,
    onSuccess: () => {
      qc.removeQueries({ queryKey: ["me"] });
    },
  });
};

export const useRegister = () => {
  // const qc = useQueryClient();

  return useMutation({
    mutationFn: authService.register,
    // retry: false,
    // onSuccess: () => {
    //   qc.invalidateQueries({ queryKey: ["me"] }); // refetch API "me"
    // },
    onError: (error: any) => {
      console.error(error.response?.data?.message || "Registration failed");
    },
  });
};
