import { employeeService } from "@/services/employees";
import { Employee } from "@/types/employee";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { error } from "console";

export const useEmployee = () => {
  return useQuery({
    queryKey: ["employee"],
    queryFn: employeeService.getEmployees,
    retry: false,
    staleTime: 5000, // 5 ms no API call
  });
};

const useAddEmployee = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: employeeService.addEmployee,
    retry: false,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee"] });
    },
    onError: (error: any) => {
      console.error(error.response?.data?.message || "Failed to Add employee");
    },
  });
};

const useUpdateEmployee = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: employeeService.updateEmployee,
    retry: false,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee"] });
    },
    onError: (error: any) => {
      console.error(
        error.response?.data?.message || "Failed to update employee"
      );
    },
  });
};

const useDeleteEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: employeeService.deleteEmployee,
    retry: false,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["employee"] });
    },
    onError: (error: any) => {
      console.error(
        error.response?.data?.message || "Failed to delete Employee"
      );
    },
  });
};

const useSearchEmployee = (name: string) => {
  return useQuery<Employee[]>({
    queryKey: ["employee", "search", name],
    queryFn: () => employeeService.searchEmployees(name),
    enabled: !!name,
    staleTime: 5 * 60 * 1000,
  });
};
