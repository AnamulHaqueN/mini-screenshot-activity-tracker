import { User } from "./user";

export interface Employee extends User {
  role: "employee",
  screenshot_count: number,
  last_screenshot_at: string | null,
}

export interface CreateEmployee {
  name: string,
  email: string,
  password: string,
}
