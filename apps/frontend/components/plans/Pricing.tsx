"use client"

import {usePlans} from "@/queries/plans"
import {useRouter} from "next/navigation"

export default function Pricing() {
   const {data: plans} = usePlans()
   const router = useRouter()

   console.log("Plan:", plans)

   const handleBuy = (id: number) => {
      router.push(`/register?plan_id=${id}`)
   }

   return (
      <div className="bg-slate-50 py-20 px-6">
         <div className="max-w-7xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold">Pricing Plans</h1>
            <p className="text-gray-600 mt-3">
               Simple per-seat pricing. Choose what fits your team.
            </p>
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {plans?.map(plan => (
               <div
                  key={plan.name}
                  className={`rounded-2xl border bg-white p-6 flex flex-col shadow-sm ${
                     plan?.highlight ? "border-blue-500 ring-2 ring-blue-500" : ""
                  }`}>
                  {plan.highlight && (
                     <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full w-fit mb-3">
                        Most Popular
                     </span>
                  )}

                  <h2 className="text-2xl font-bold">{plan.name}</h2>

                  <div className="mt-4">
                     <span className="text-4xl font-bold">{plan.price}</span>
                     <span className="text-gray-500">{plan.period}</span>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">{plan.note}</p>

                  <ul className="mt-6 space-y-2 text-sm text-gray-700 flex-1">
                     {plan.features?.map(feature => (
                        <li key={feature} className="flex items-start gap-2">
                           <span className="text-green-500">✔</span>
                           {feature}
                        </li>
                     ))}
                  </ul>

                  <button
                     onClick={() => handleBuy(plan.id)}
                     className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
                     Choose Plan
                  </button>
               </div>
            ))}
         </div>
      </div>
   )
}
