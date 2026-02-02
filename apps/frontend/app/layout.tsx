import type {Metadata} from "next"
import "./globals.css"
import {AuthProvider} from "@/providers/AuthProvider"
import QueryProvider from "@/providers/QueryProvider"
import {APP_DESCRIPTION, APP_NAME} from "./metadata"
import {Camera} from "lucide-react"

export const metadata: Metadata = {
   title: APP_NAME,
   description: APP_DESCRIPTION,
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <body>
            <QueryProvider>
               <AuthProvider>{children}</AuthProvider>
            </QueryProvider>
            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                     <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                           <Camera className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">{APP_NAME}</span>
                     </div>
                     <p className="text-sm">© 2026 {APP_NAME}. All rights reserved.</p>
                  </div>
               </div>
            </footer>
         </body>
      </html>
   )
}
