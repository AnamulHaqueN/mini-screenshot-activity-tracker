import { Company } from ".";

export type UserRole = "owner" | "employee";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  company: Company;
};

export interface AdminDashboardResponse {
  data: User[];
}
