"use client"

import {useLogin} from "@/queries/auth"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {LoginInput, loginSchema} from "../../../schemas/login"
import {ZodError} from "zod"
import {LoginResponse} from "@/types/error"
import {APP_NAME} from "@/app/metadata"
import {Camera} from "lucide-react"

type FieldErrors = {
   email?: string
   password?: string
}

export default function LoginPage() {
   const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
   const {mutateAsync, isPending, isError, error} = useLogin()
   const router = useRouter()

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setFieldErrors({})

      const formData = new FormData(e.currentTarget)

      try {
         const validatedData: LoginInput = loginSchema.parse({
            email: formData.get("email"),
            password: formData.get("password"),
         })

         const result = (await mutateAsync(validatedData)) as LoginResponse
         const role = result.data.user.role

         if (role === "admin" || role === "owner") router.push("/dashboard")
         else router.push("/screenshots")
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

   return (
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
         {/* LEFT PANEL */}
         <div className="hidden md:flex bg-linear-to-r from-purple-900 via-indigo-900 to-purple-900 text-white flex-col items-center justify-center p-12">
            <h1 className="text-3xl font-bold text-center mb-8">
               Our white label mobile
               <br /> app & web services.
            </h1>

            {/* <img src="/mockup.png" alt="App preview" className="max-w-md" /> */}
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
                  <h2 className="text-xl font-bold">Welcome back!</h2>
               </div>

               <form onSubmit={handleSubmit} className="space-y-5">
                  {isError && (
                     <div className="bg-red-50 border border-red-400 text-red-700 px-3 py-2 rounded">
                        {error?.response?.status === 429
                           ? "Too many login attempts. Please try again later."
                           : error?.response?.data?.message ||
                             "Login failed. Please try again."}
                     </div>
                  )}

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

                  <div>
                     <label className="block text-sm font-medium">Password</label>
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

                  <div className="text-right">
                     <Link
                        href="/forgot-password"
                        className="text-sm text-indigo-600 hover:underline">
                        Forgot password?
                     </Link>
                  </div>

                  <button
                     type="submit"
                     disabled={isPending}
                     className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
                     {isPending ? "Signing in..." : "Log In"}
                  </button>

                  <p className="text-center text-sm mt-4">
                     Not member?{" "}
                     <Link href="/pricing" className="text-indigo-600 hover:underline">
                        Signup here
                     </Link>
                  </p>
               </form>
            </div>
         </div>
      </div>
   )
}
