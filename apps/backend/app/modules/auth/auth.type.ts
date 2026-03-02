export interface RegisterType {
   ownerName: string
   ownerEmail: string
   password: string
   companyName: string
   planId: number
}

export interface LoginType {
   email: string
   password: string
}

export interface ForgotPasswordType {
   email: string
}

export interface ResetPasswordType {
   email: string
   otp: string
   password: string
}
