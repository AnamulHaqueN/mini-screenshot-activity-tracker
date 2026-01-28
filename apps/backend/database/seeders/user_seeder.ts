import Company from '#models/company'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export type RoleName = 'owner' | 'employee'

export default class UserSeeder extends BaseSeeder {
   public async run() {
      const companies = await Company.all()

      const usedEmails = new Set<string>()

      for (const company of companies) {
         /**
          * 1️⃣ Create ONE OWNER per company
          */
         const ownerEmail = this.uniqueEmail(usedEmails)

         await User.create({
            name: faker.person.fullName(),
            email: ownerEmail,
            password: await hash.make('1234'),
            isActive: true,
            companyId: company.id,
            role: 'owner' as RoleName,
         })

         /**
          * 2️⃣ Create employees (15–20 per company)
          */
         const employeesCount = faker.number.int({ min: 15, max: 20 })

         const employees = []

         for (let i = 0; i < employeesCount; i++) {
            employees.push({
               name: faker.person.fullName(),
               email: this.uniqueEmail(usedEmails),
               password: '1234', // hashed via hook OR below
               isActive: true,
               companyId: company.id,
               role: 'employee' as RoleName,
            })
         }

         await User.createMany(employees)
      }

      console.log('✅ Users seeded successfully')
   }

   /**
    * Generate guaranteed unique email
    */
   private uniqueEmail(usedEmails: Set<string>) {
      let email: string

      do {
         email = faker.internet.email().toLowerCase()
      } while (usedEmails.has(email))

      usedEmails.add(email)
      return email
   }
}
