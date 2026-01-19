import { AxiosError } from "axios";

export interface ApiErrorShape {
  message: string,
  statusCode?: number,
  errors?: Record<string, string[]> | string[]
}

export type ApiError = AxiosError<ApiErrorShape>