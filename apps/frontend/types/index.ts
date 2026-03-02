import {PaginationMeta} from "./screenshot"

export type Company = {
   id: number
   name: string
   plan: Plan
}

// type PlanType = "basic" | "pro" | "enterprise";

// export type Plan = {
//   id: number;
//   name: PlanType;
//   pricePerEmployee: number;
// };

export interface IPaginatedResponse<T> {
   data: T[]
   meta: PaginationMeta
}

export interface ApiError {
   field?: string
   message: string
   statusCode?: string
}

export interface ApiResponse<T = unknown> {
   success: boolean
   message?: string
   data?: T
   errors?: ApiError[]
}
