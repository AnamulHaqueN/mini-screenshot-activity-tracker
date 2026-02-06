"use client"

import {useRegister} from "@/queries/auth"
import {useRouter, useSearchParams} from "next/navigation"
import {useState} from "react"
import {RegisterInput, registerSchema} from "../../../schemas/register"
import {ZodError} from "zod"
import Link from "next/link"
import {plans} from "@/utils/plans"

type FieldErrors = {
   firstName?: string
   lastName?: string
   ownerEmail?: string
   password?: string
   companyName?: string
   planId?: string
}

export default function Register() {
   const {mutateAsync, isPending, error} = useRegister()
   const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
   const router = useRouter()
   const searchParams = useSearchParams()
   const planId = Number(searchParams.get("plan_id"))

   const selectedPlan = plans?.find(p => p.id === planId)

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setFieldErrors({})

      const formData = new FormData(e.currentTarget)

      try {
         const validateData: RegisterInput = registerSchema.parse({
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            ownerEmail: formData.get("ownerEmail"),
            companyName: formData.get("companyName"),
            password: formData.get("password"),
            planId,
         })

         const configuredData = {
            ownerName: validateData.firstName + " " + validateData.lastName,
            ...validateData,
         }

         await mutateAsync(configuredData)
         router.push("/login")
      } catch (err) {
         console.log("error", err)
         if (err instanceof ZodError) {
            const errors: FieldErrors = {}
            err.issues.forEach(issue => {
               const field = issue.path[0] as keyof FieldErrors
               console.log("field", field)
               console.log("message", issue.message)
               errors[field] = issue.message
            })
            setFieldErrors(errors)
         }
      }
   }

   return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
         <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-gray-500 mb-8">Complete your purchase securely</p>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
               {/* LEFT: ACCOUNT INFO */}
               <div className="bg-white rounded-xl shadow p-6 space-y-6">
                  <h2 className="text-xl font-semibold mb-4">Account Information</h2>

                  {error && (
                     <div className="bg-red-50 border border-red-400 text-red-700 px-3 py-2 rounded">
                        {error.message}
                     </div>
                  )}

                  <div>
                     <label className="block text-sm font-medium">
                        <span className="text-red-400">* </span>
                        Company Name
                     </label>
                     <input
                        name="companyName"
                        className="mt-1 w-full border rounded-md px-3 py-2"
                        placeholder="Company Name"
                     />
                     {fieldErrors.companyName && (
                        <p className="text-red-500 text-sm">{fieldErrors.companyName}</p>
                     )}
                  </div>

                  <div>
                     <label className="block text-sm font-medium">
                        <span className="text-red-500">* </span>Email
                     </label>
                     <input
                        name="ownerEmail"
                        type="email"
                        className="mt-1 w-full border rounded-md px-3 py-2"
                        placeholder="Enter your email"
                     />
                     {fieldErrors.ownerEmail && (
                        <p className="text-red-500 text-sm">{fieldErrors.ownerEmail}</p>
                     )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium">
                           <span className="text-red-500">* </span>First Name
                        </label>
                        <input
                           name="firstName"
                           className="mt-1 w-full border rounded-md px-3 py-2"
                           placeholder="First name"
                        />
                        {fieldErrors.firstName && (
                           <p className="text-red-500 text-sm">{fieldErrors.firstName}</p>
                        )}
                     </div>
                     <div>
                        <label className="block text-sm font-medium">
                           <span className="text-red-500">* </span>Last Name
                        </label>
                        <input
                           name="lastName"
                           className="mt-1 w-full border rounded-md px-3 py-2"
                           placeholder="Last name"
                        />
                        {fieldErrors.lastName && (
                           <p className="text-red-500 text-sm">{fieldErrors.lastName}</p>
                        )}
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium">
                           <span className="text-red-500">* </span>Password{" "}
                        </label>
                        <input
                           type="password"
                           name="password"
                           className="mt-1 w-full border rounded-md px-3 py-2"
                           placeholder="Enter password"
                        />
                        {fieldErrors.password && (
                           <p className="text-red-500 text-sm">{fieldErrors.password}</p>
                        )}
                     </div>
                     <div>
                        <label className="block text-sm font-medium">
                           <span className="text-red-500">* </span>Confirm
                        </label>
                        <input
                           type="password"
                           className="mt-1 w-full border rounded-md px-3 py-2"
                           placeholder="Confirm password"
                        />
                     </div>
                  </div>
               </div>

               {/* RIGHT: PLAN SUMMARY */}
               <div className="bg-white rounded-xl shadow p-6 space-y-4">
                  <div className="flex justify-between items-center">
                     <div>
                        <h2 className="text-xl font-semibold">{selectedPlan?.name}</h2>
                        <p className="text-gray-500">{selectedPlan?.description}</p>
                     </div>
                     <span className="border px-3 py-1 rounded text-sm text-purple-600">
                        Subscribe to Monthly
                     </span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-lg">
                     <span>Price:</span>
                     <span className="font-bold">{selectedPlan?.price ?? "0.00"}</span>
                  </div>

                  <label className="flex items-start gap-2 text-sm">
                     <input type="checkbox" required />
                     <span>
                        I agree to the{" "}
                        <Link href="/terms" className="text-purple-600 underline">
                           Terms and Conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-purple-600 underline">
                           Privacy Policy
                        </Link>
                     </span>
                  </label>

                  <button
                     disabled={isPending}
                     className="w-full bg-green-600 text-white py-3 rounded-lg mt-4 disabled:opacity-50 cursor-pointer">
                     {isPending ? "Processing..." : "Place Order"}
                  </button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                     🔒 Your payment information is secure and encrypted
                  </p>
               </div>
            </form>
         </div>
      </div>
   )
}
