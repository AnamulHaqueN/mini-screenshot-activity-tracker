"use client"

import {APP_NAME} from "@/app/metadata"
import {useMe, useLogout} from "@/queries/auth"
import {useRouter} from "next/navigation"

export default function Navbar() {
   const router = useRouter()

   const {data: user, isLoading} = useMe()
   const {mutate: logout, isPending} = useLogout()

   const handleLogout = () => {
      logout(undefined, {
         onSuccess: () => {
            router.push("/login")
         },
      })
   }

   return (
      <nav className="flex items-center justify-between px-6 py-4 border-b">
         {/* Left */}
         <div className="flex items-center gap-6">
            <span className="text-lg font-semibold">{APP_NAME}</span>
         </div>

         {/* Right */}
         <div className="flex items-center gap-4">
            {isLoading ? (
               <span>Loading...</span>
            ) : (
               <span className="text-sm font-medium">
                  {user?.name ?? "admin (owner)"}
               </span>
            )}

            <button
               onClick={handleLogout}
               disabled={isPending}
               className="text-red-600 cursor-pointer hover:underline">
               {isPending ? "Logging out..." : "Logout"}
            </button>
         </div>
      </nav>
   )
}
