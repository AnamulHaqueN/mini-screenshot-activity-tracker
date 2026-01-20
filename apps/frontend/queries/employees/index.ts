import { employeeService } from "@/services/employees";
import { Employee } from "@/types/employee";
import { ApiError } from "@/types/error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useEmployee = () => {
  return useQuery({
    queryKey: ["employee"],
    queryFn: employeeService.getEmployees,
    retry: false,
    staleTime: 5 * 60 * 1000, // for 5 min no API call
  });
};

export const useAddEmployee = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: employeeService.addEmployee,
    retry: false,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee"] });
    },
    onError: (error: ApiError) => {
      console.error(error.response?.data?.message || "Failed to Add employee");
    },
  });
};

export const useUpdateEmployee = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: employeeService.updateEmployee,
    retry: false,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee"] });
    },
    onError: (error: ApiError) => {
      console.error(
        error.response?.data?.message || "Failed to update employee"
      );
    },
  });
};

export const useDeleteEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: employeeService.deleteEmployee,
    retry: false,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee"] });
    },
    onError: (error: ApiError) => {
      console.error(
        error.response?.data?.message || "Failed to delete Employee"
      );
    },
  });
};

export const useSearchEmployee = (name: string) => {
  return useQuery<Employee[]>({
    queryKey: ["employee", "search", name],
    queryFn: () => employeeService.searchEmployees(name),
    enabled: !!name,
    staleTime: 5 * 60 * 1000,
  });
};
