import { Company } from ".";

export type UserRole = "owner" | "employee";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  company: Company;
};

export interface CreteEmployee {
  name: string;
  email: string;
  password: string;
}

export interface AdminDashboardResponse {
  data: User[];
}
