import { AxiosError } from "axios";
import { User } from "./user";

export interface ApiErrorShape {
  message: string,
  statusCode?: number,
  errors?: Record<string, string[]> | string[]
}

export interface LoginResponse {
  message: string,
  data: {user: User}
}

export type ApiError = AxiosError<ApiErrorShape>