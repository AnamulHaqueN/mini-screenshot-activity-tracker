import { User } from "./user";

export interface Employee extends User {
  role: "employee",
  screenshot_count: number,
  last_screenshot_at: string | null,
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    firstPageUrl: string;
    lastPageUrl: string;
    nextPageUrl: null | string;
    previousPageUrl: null | string;
  };
}

export interface CreateEmployee {
  name: string,
  email: string,
  password: string,
}
