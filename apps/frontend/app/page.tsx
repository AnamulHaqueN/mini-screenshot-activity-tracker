"use client"
import {useRouter} from "next/navigation"
import {Shield, BarChart3, Camera, ArrowRight, CheckCircle2} from "lucide-react"
import {useMe} from "@/queries/auth"
import {APP_NAME} from "./metadata"

export default function HomePage() {
   const router = useRouter()

   const {data: user} = useMe()

   const handleGetStarted = () => {
      if (user) {
         if (user.role === "admin") {
            router.push("/dashboard")
         } else {
            router.push("/screenshots")
         }
      } else {
         router.push("/pricing")
      }
   }

   const handleSignIn = () => {
      router.push("/login")
   }

   return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
         {/* Navigation */}

         {/* Hero Section */}
         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div className="text-center max-w-3xl mx-auto">
               <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Simple Employee
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                     {" "}
                     Activity Tracking
                  </span>
               </h1>
               <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Monitor team productivity with automated screenshot tracking. Track work
                  hours, view activity timelines, and gain insights into your team&apos;s
                  workflow.
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                     onClick={handleGetStarted}
                     className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-lg flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer">
                     {user ? "Go to Dashboard" : "Get Started Now"}
                     <ArrowRight className="w-5 h-5" />
                  </button>
                  {!user && (
                     <button
                        onClick={handleSignIn}
                        className="px-8 py-4 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-lg border border-gray-300 cursor-pointer">
                        Sign In
                     </button>
                  )}
               </div>
            </div>

            {/* Hero Image/Preview */}
            <div className="mt-16 relative">
               <div className="bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl p-1 shadow-2xl">
                  <div className="bg-white rounded-xl p-8">
                     <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                           <div
                              key={i}
                              className="aspect-video bg-linear-to-br from-gray-100 to-gray-200 rounded-lg animate-pulse"></div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Features Section */}
         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Everything you need to track productivity
               </h2>
               <p className="text-xl text-gray-600">
                  Simple, powerful tools to monitor team activity
               </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {/* Feature 1 */}
               <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                     <Camera className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                     Automated Screenshots
                  </h3>
                  <p className="text-gray-600">
                     Capture work activity automatically at regular intervals without
                     manual intervention
                  </p>
               </div>

               {/* Feature 2 */}
               <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                     <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                     Productivity Analytics
                  </h3>
                  <p className="text-gray-600">
                     Track hours worked, active time, and productivity patterns across
                     your team
                  </p>
               </div>

               {/* Feature 3 */}
               <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                     <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                     Secure & Private
                  </h3>
                  <p className="text-gray-600">
                     Enterprise-grade security with encrypted data storage and role-based
                     access
                  </p>
               </div>
            </div>
         </section>

         {/* How It Works */}
         <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                     How it works
                  </h2>
                  <p className="text-xl text-gray-600">
                     Get started in three simple steps
                  </p>
               </div>

               <div className="grid md:grid-cols-3 gap-12">
                  {/* Step 1 */}
                  <div className="text-center">
                     <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                        1
                     </div>
                     <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Create Account
                     </h3>
                     <p className="text-gray-600">
                        Sign up and set up your company profile in minutes
                     </p>
                  </div>

                  {/* Step 2 */}
                  <div className="text-center">
                     <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                        2
                     </div>
                     <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Add Employees
                     </h3>
                     <p className="text-gray-600">
                        Add team members and configure their screenshot intervals
                     </p>
                  </div>

                  {/* Step 3 */}
                  <div className="text-center">
                     <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                        3
                     </div>
                     <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Track Activity
                     </h3>
                     <p className="text-gray-600">
                        View screenshots, timelines, and productivity metrics
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Benefits */}
         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl p-12 text-white">
               <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                     Why choose {APP_NAME}?
                  </h2>
                  <div className="space-y-4 text-left">
                     <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                        <div>
                           <p className="font-medium text-lg">Increase Productivity</p>
                           <p className="text-blue-100">
                              Monitor work patterns and identify areas for improvement
                           </p>
                        </div>
                     </div>
                     <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                        <div>
                           <p className="font-medium text-lg">Remote Team Management</p>
                           <p className="text-blue-100">
                              Perfect for managing distributed teams and remote workers
                           </p>
                        </div>
                     </div>
                     <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                        <div>
                           <p className="font-medium text-lg">Transparent Workflow</p>
                           <p className="text-blue-100">
                              Build trust with clear visibility into work activity
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-200">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Ready to get started?
               </h2>
               <p className="text-xl text-gray-600 mb-8">
                  {user
                     ? "Head to your dashboard to start tracking"
                     : `Join teams already using ${APP_NAME} to boost productivity`}
               </p>
               <button
                  onClick={handleGetStarted}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-lg flex items-center gap-2 mx-auto shadow-lg shadow-blue-600/30 cursor-pointer">
                  {user ? "Go to Dashboard" : "Start Here"}
                  <ArrowRight className="w-5 h-5" />
               </button>
            </div>
         </section>
      </div>
   )
}
