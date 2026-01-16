import { User } from "./user";

export interface Employee extends User {
  role: "employee";
}

export interface CreateEmployee {
  name: string;
  email: string;
  password: string;
}
