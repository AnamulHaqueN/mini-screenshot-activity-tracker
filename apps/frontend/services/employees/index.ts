import api from "@/http/axios";
import { Employee, CreateEmployee } from "@/types/employee";

export const employeeService = {
  async getEmployees(): Promise<Employee[]> {
    const response = await api.get("/api/admin/employees");
    return response.data.data;
  },

  async addEmployee(data: CreateEmployee) {
    const response = await api.post("/api/admin/employees", data);
    return response.data;
  },

  async updateEmployee(data: { id: number; isActive: boolean }) {
    const { id, isActive } = data;
    const response = await api.put(`/api/admin/employees/${id}`, isActive);
    return response.data;
  },

  async deleteEmployee(id: number) {
    const response = await api.delete(`/api/admin/employees/${id}`);
    return response.data;
  },

  async searchEmployees(name: string): Promise<Employee[]> {
    const response = await api.get("/api/admin/employees/search", { params: { name } });
    return response.data.data;
  },
};
