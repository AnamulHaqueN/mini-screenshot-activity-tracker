"use client"

import {useForgotPassword, useResetPassword} from "@/queries/auth"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {
   forgotPasswordSchema,
   resetPasswordSchema,
   ForgotPasswordInput,
} from "../../../schemas/forgot-password"
import {ZodError} from "zod"
import {Camera} from "lucide-react"

type Step = "email" | "otp"

type FieldErrors = {
   email?: string
   otp?: string
   password?: string
   password_confirmation?: string
}

export default function ForgotPasswordPage() {
   const [step, setStep] = useState<Step>("email")
   const [email, setEmail] = useState("")
   const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
   const router = useRouter()

   const {
      mutateAsync: sendOtp,
      isPending: isSending,
      isError: isSendError,
      error: sendError,
   } = useForgotPassword()

   const {
      mutateAsync: resetPassword,
      isPending: isResetting,
      isError: isResetError,
      error: resetError,
   } = useResetPassword()

   const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setFieldErrors({})

      const formData = new FormData(e.currentTarget)

      try {
         const validated: ForgotPasswordInput = forgotPasswordSchema.parse({
            email: formData.get("email"),
         })

         await sendOtp(validated)
         setEmail(validated.email)
         setStep("otp")
      } catch (err) {
         if (err instanceof ZodError) {
            const errors: FieldErrors = {}
            err.issues.forEach(issue => {
               const field = issue.path[0] as keyof FieldErrors
               errors[field] = issue.message
            })
            setFieldErrors(errors)
         }
      }
   }

   const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setFieldErrors({})

      const formData = new FormData(e.currentTarget)

      try {
         const validated = resetPasswordSchema.parse({
            email,
            otp: formData.get("otp"),
            password: formData.get("password"),
            password_confirmation: formData.get("password_confirmation"),
         })

         await resetPassword(validated)
         router.push("/login")
      } catch (err) {
         if (err instanceof ZodError) {
            const errors: FieldErrors = {}
            err.issues.forEach(issue => {
               const field = issue.path[0] as keyof FieldErrors
               errors[field] = issue.message
            })
            setFieldErrors(errors)
         }
      }
   }

   const apiError = isSendError ? sendError : isResetError ? resetError : null

   return (
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
         {/* LEFT PANEL */}
         <div className="hidden md:flex bg-linear-to-r from-purple-900 via-indigo-900 to-purple-900 text-white flex-col items-center justify-center p-12">
            <h1 className="text-3xl font-bold text-center mb-8">
               Our white label mobile
               <br /> app & web services.
            </h1>
         </div>

         {/* RIGHT PANEL */}
         <div className="flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
               <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-2">
                     <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Camera className="w-5 h-5 text-white" />
                     </div>
                     <h1 className="text-2xl font-bold">
                        Ezy<span className="text-blue-500">Staff</span>
                     </h1>
                  </div>
                  <h2 className="text-xl font-bold">
                     {step === "email" ? "Forgot Password" : "Reset Password"}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                     {step === "email"
                        ? "Enter your email to receive an OTP code."
                        : `Enter the 6-digit code sent to ${email}`}
                  </p>
               </div>

               {apiError && (
                  <div className="bg-red-50 border border-red-400 text-red-700 px-3 py-2 rounded mb-4">
                     {apiError?.response?.status === 429
                        ? "Too many requests. Please try again later."
                        : apiError?.response?.data?.message || "Something went wrong."}
                  </div>
               )}

               {step === "email" ? (
                  <form key="email-step" onSubmit={handleSendOtp} className="space-y-5">
                     <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                           name="email"
                           type="email"
                           placeholder="Email"
                           className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                        />
                        {fieldErrors.email && (
                           <p className="text-red-500 text-sm">{fieldErrors.email}</p>
                        )}
                     </div>

                     <button
                        type="submit"
                        disabled={isSending}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
                        {isSending ? "Sending OTP..." : "Send OTP"}
                     </button>

                     <p className="text-center text-sm mt-4">
                        Remember your password?{" "}
                        <Link href="/login" className="text-indigo-600 hover:underline">
                           Back to login
                        </Link>
                     </p>
                  </form>
               ) : (
                  <form
                     key="otp-step"
                     onSubmit={handleResetPassword}
                     className="space-y-5">
                     <div>
                        <label className="block text-sm font-medium">OTP Code</label>
                        <input
                           name="otp"
                           type="text"
                           placeholder="6-digit code"
                           maxLength={6}
                           className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                        />
                        {fieldErrors.otp && (
                           <p className="text-red-500 text-sm">{fieldErrors.otp}</p>
                        )}
                     </div>

                     <div>
                        <label className="block text-sm font-medium">New Password</label>
                        <input
                           name="password"
                           type="password"
                           placeholder="Password (4+ characters)"
                           className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                        />
                        {fieldErrors.password && (
                           <p className="text-red-500 text-sm">{fieldErrors.password}</p>
                        )}
                     </div>

                     <div>
                        <label className="block text-sm font-medium">
                           Confirm Password
                        </label>
                        <input
                           name="password_confirmation"
                           type="password"
                           placeholder="Confirm password"
                           className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                        />
                        {fieldErrors.password_confirmation && (
                           <p className="text-red-500 text-sm">
                              {fieldErrors.password_confirmation}
                           </p>
                        )}
                     </div>

                     <button
                        type="submit"
                        disabled={isResetting}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
                        {isResetting ? "Resetting..." : "Reset Password"}
                     </button>

                     <p className="text-center text-sm mt-4">
                        <button
                           type="button"
                           onClick={() => setStep("email")}
                           className="text-indigo-600 hover:underline cursor-pointer">
                           Generate OTP again
                        </button>
                     </p>
                  </form>
               )}
            </div>
         </div>
      </div>
   )
}
