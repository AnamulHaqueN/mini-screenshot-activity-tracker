import {planService} from "@/services/plans"

const plansFromBackend = await planService.getPlans()

interface ExtendedPlanType {
   id: number
   name: string
   description: string
   price: string
   period: string
   note: string
   features: string[]
   highlight?: boolean
}

const plansData = []

for (const plan of plansFromBackend) {
   let cur: ExtendedPlanType = {
      description: "",
      period: "",
      note: "",
      features: [],
      price: `$${plan.pricePerEmployee}`,
      id: plan.id,
      name: plan.name,
   }
   if (plan.name === "basic") {
      cur.name = "Basic"
      cur.description = "Basic Plan"
      cur.period = "/ seat / mo"
      cur.note = "4 seat minimum"
      cur.features = [
         "Time tracking",
         "Timesheets",
         "Activity levels",
         "Limited screenshots",
         "Limited app & URL tracking",
         "Limited reports",
         "Limited payments",
         "Clients & Invoices",
         "Two-day email support SLA",
      ]
   } else if (plan.name === "pro") {
      cur.name = "Pro"
      cur.description = "Ezystaff Pro Plan"
      cur.period = "/ seat / mo"
      cur.note = "4 seat minimum"
      cur.highlight = true
      cur.features = [
         "All Starter features",
         "Reports",
         "1 integration",
         "Idle timeout",
         "Project budgets",
         "Work breaks",
         "Expenses",
         "Limited screenshots",
         "Limited app & URL tracking",
         "One-day email support SLA",
      ]
   } else if (plan.name === "enterprise") {
      cur.name = "Enterprise"
      cur.description = "Ezystaff Enterprise Plan"
      cur.period = "/ seat / mo"
      cur.features = [
         "All Team features",
         "Higher API limits",
         "Pay by bank debit (ACH)",
         "HIPAA compliance",
         "SOC-2 Type II compliance",
         "Enterprise deployment",
         "Account provisioning",
         "Single sign-on",
         "Silent app",
         "Concierge setup",
         "Assigned account rep",
         "Two-hour email support SLA",
      ]
      cur.note = "Billed annually"
   }
   plansData.push(cur)
}

export const plans = plansData

const prevVersion = [
   {
      id: 1,
      name: "Basic",
      description: "Basic Plan",
      price: "$7",
      period: "/ seat / mo",
      note: "4 seat minimum",
      features: [
         "Time tracking",
         "Timesheets",
         "Activity levels",
         "Limited screenshots",
         "Limited app & URL tracking",
         "Limited reports",
         "Limited payments",
         "Clients & Invoices",
         "Two-day email support SLA",
      ],
   },
   {
      id: 2,
      name: "Pro",
      description: "Ezystaff Pro Plan",
      price: "$9",
      period: "/ seat / mo",
      note: "4 seat minimum",
      features: [
         "All Starter features",
         "Reports",
         "1 integration",
         "Idle timeout",
         "Project budgets",
         "Work breaks",
         "Expenses",
         "Limited screenshots",
         "Limited app & URL tracking",
         "One-day email support SLA",
      ],
      highlight: true,
   },
   {
      id: 3,
      name: "Elite",
      description: "Ezystaff Elite Plan",
      price: "$12",
      period: "/ seat / mo",
      note: "4 seat minimum",
      features: [
         "All Grow features",
         "Unlimited screenshots",
         "Unlimited app & URL tracking",
         "Auto discard idle time",
         "Teams",
         "Payments & payroll",
         "Unlimited integrations",
         "Overtime",
         "Time off & holidays",
         "Scheduling & attendance",
         "Client budgets",
         "Timesheet approvals",
         "Daily & weekly limits",
         "Chat support",
         "One-day email support SLA",
      ],
   },
   {
      id: 4,
      name: "Enterprise",
      description: "Ezystaff Enterprise Plan",
      price: "$25",
      period: "/ seat / mo",
      note: "Billed annually",
      features: [
         "All Team features",
         "Higher API limits",
         "Pay by bank debit (ACH)",
         "HIPAA compliance",
         "SOC-2 Type II compliance",
         "Enterprise deployment",
         "Account provisioning",
         "Single sign-on",
         "Silent app",
         "Concierge setup",
         "Assigned account rep",
         "Two-hour email support SLA",
      ],
   },
]
