import { User } from "./user";

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  ownerName: string;
  ownerEmail: string;
  companyName: string;
  password: string;
  planId: number;
}

export interface IAuthResponse {
  message: string;
  data: User;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  email: string;
  otp: string;
  password: string;
  password_confirmation: string;
}
