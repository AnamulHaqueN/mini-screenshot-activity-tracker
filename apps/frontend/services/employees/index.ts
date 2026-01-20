import api from "@/http/axios";
import { Employee, CreateEmployee } from "@/types/employee";

export const employeeService = {
  async getEmployees(searchTerm?: string): Promise<Employee[]> {
    if (searchTerm) return this.searchEmployees(searchTerm);

    const response = await api.get("/employees");
    return response.data.data;
  },

  async addEmployee(data: CreateEmployee) {
    const response = await api.post("/employees", data);
    return response.data;
  },

  async updateEmployee(data: { id: number; isActive: boolean }) {
    const { id, isActive } = data;
    const response = await api.put(`/employees/${id}`, isActive);
    return response.data;
  },

  async deleteEmployee(id: number) {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  },

  async searchEmployees(name: string): Promise<Employee[]> {
    const response = await api.get("/employees/search", { params: { name } });
    return response.data.data;
  },
};
