"use client"

import {APP_NAME} from "@/app/metadata"
import {useMe, useLogout} from "@/queries/auth"
import {useRouter} from "next/navigation"
import {Camera, LogOut, User, Loader2, Menu, X} from "lucide-react"
import {useState} from "react"

export default function Navbar() {
   const router = useRouter()
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

   const {data: user, isLoading} = useMe()
   const {mutate: logout, isPending} = useLogout()

   const handleLogout = () => {
      logout(undefined, {
         onSuccess: () => {
            router.push("/")
         },
      })
   }

   const handleDashboard = () => {
      if (user?.role === "admin" || user?.role === "owner") {
         router.push("/dashboard")
      } else if (user?.role === "employee") {
         router.push("/screenshots")
      }
   }

   return (
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
               {/* Logo */}
               <div
                  className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
                  onClick={handleDashboard}>
                  <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                     <Camera className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">{APP_NAME}</span>
               </div>

               {/* Desktop Menu */}
               <div className="hidden md:flex items-center gap-4">
                  {isLoading ? (
                     <div className="flex items-center gap-2 text-gray-500">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Loading...</span>
                     </div>
                  ) : user ? (
                     <>
                        {/* User Info */}
                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                           <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600" />
                           </div>
                           <div className="text-left">
                              <p className="text-sm font-medium text-gray-900">
                                 {user.name}
                              </p>
                              <p className="text-xs text-gray-500 capitalize">
                                 {user.role}
                              </p>
                           </div>
                        </div>

                        {/* Logout Button */}
                        <button
                           onClick={handleLogout}
                           disabled={isPending}
                           className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
                           {isPending ? (
                              <>
                                 <Loader2 className="w-4 h-4 animate-spin" />
                                 <span>Logging out...</span>
                              </>
                           ) : (
                              <>
                                 <LogOut className="w-4 h-4" />
                                 <span>Logout</span>
                              </>
                           )}
                        </button>
                     </>
                  ) : (
                     <div className="flex items-center gap-2">
                        <button
                           onClick={() => router.push("/login")}
                           className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                           Sign In
                        </button>
                        <button
                           onClick={() => router.push("/signup")}
                           className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                           Get Started
                        </button>
                     </div>
                  )}
               </div>

               {/* Mobile Menu Button */}
               <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
                  {mobileMenuOpen ? (
                     <X className="w-6 h-6" />
                  ) : (
                     <Menu className="w-6 h-6" />
                  )}
               </button>
            </div>
         </div>

         {/* Mobile Menu */}
         {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
               <div className="px-4 py-4 space-y-3">
                  {isLoading ? (
                     <div className="flex items-center gap-2 text-gray-500 py-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Loading...</span>
                     </div>
                  ) : user ? (
                     <>
                        {/* User Info */}
                        <div className="flex items-center gap-3 px-3 py-3 bg-gray-50 rounded-lg">
                           <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-blue-600" />
                           </div>
                           <div>
                              <p className="text-sm font-medium text-gray-900">
                                 {user.name}
                              </p>
                              <p className="text-xs text-gray-500 capitalize">
                                 {user.role}
                              </p>
                           </div>
                        </div>

                        {/* Dashboard Button */}
                        <button
                           onClick={() => {
                              handleDashboard()
                              setMobileMenuOpen(false)
                           }}
                           className="w-full px-4 py-2 text-sm font-medium text-left text-gray-700 hover:bg-gray-50 rounded-lg transition">
                           Dashboard
                        </button>

                        {/* Logout Button */}
                        <button
                           onClick={() => {
                              handleLogout()
                              setMobileMenuOpen(false)
                           }}
                           disabled={isPending}
                           className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50">
                           {isPending ? (
                              <>
                                 <Loader2 className="w-4 h-4 animate-spin" />
                                 <span>Logging out...</span>
                              </>
                           ) : (
                              <>
                                 <LogOut className="w-4 h-4" />
                                 <span>Logout</span>
                              </>
                           )}
                        </button>
                     </>
                  ) : (
                     <>
                        <button
                           onClick={() => {
                              router.push("/login")
                              setMobileMenuOpen(false)
                           }}
                           className="w-full px-4 py-2 text-sm font-medium text-left text-gray-700 hover:bg-gray-50 rounded-lg transition">
                           Sign In
                        </button>
                        <button
                           onClick={() => {
                              router.push("/signup")
                              setMobileMenuOpen(false)
                           }}
                           className="w-full px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                           Get Started
                        </button>
                     </>
                  )}
               </div>
            </div>
         )}
      </nav>
   )
}
