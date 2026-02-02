import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Company from '#models/company'
import User from '#models/user'
import { faker } from '@faker-js/faker'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

const TOTAL_COMPANIES = 100
const EMPLOYEES_PER_COMPANY = 30
const TOTAL_SCREENSHOTS = 1_000_000

const CLOUDINARY_URL =
   'https://res.cloudinary.com/dv1lgs6pw/image/upload/v1769583617/screenshots/201/2165/1769583614918_Screenshot%20from%202026-01-25%2016-39-18.png.png'

export default class ScreenshotStressSeeder extends BaseSeeder {
   public async run() {
      console.log('Seeding companies...')

      const companies = await Company.createMany(
         Array.from({ length: TOTAL_COMPANIES }).map((_, i) => ({
            name: `Company ${i + 1}`,
            planId: faker.number.int({ min: 1, max: 3 }),
         }))
      )

      console.log('Seeding users...')

      const users: User[] = []

      for (const company of companies) {
         const admin = await User.create({
            name: `admin-${company.id}`,
            email: `admin-${company.id}@go.com`,
            password: '1234',
            role: 'owner',
            companyId: company.id,
         })

         users.push(admin)

         for (let i = 0; i < EMPLOYEES_PER_COMPANY; i++) {
            const employee = await User.create({
               name: `employee-${company.id}-${i + 1}`,
               email: `employee-${company.id}-${i + 1}@go.com`,
               password: '1234',
               role: 'employee',
               companyId: company.id,
            })

            users.push(employee)
         }
      }

      console.log(`Seeding ${TOTAL_SCREENSHOTS.toLocaleString()} screenshots...`)

      const userIds = users.map((u) => u.id)
      const companyIds = companies.map((c) => c.id)

      const BATCH_SIZE = 5000

      for (let offset = 0; offset < TOTAL_SCREENSHOTS; offset += BATCH_SIZE) {
         const rows = []

         for (let i = 0; i < BATCH_SIZE && offset + i < TOTAL_SCREENSHOTS; i++) {
            const randomUserId = faker.helpers.arrayElement(userIds)
            const randomCompanyId = faker.helpers.arrayElement(companyIds)

            const dateTime = this.randomTimeFromLastSevenDays()

            rows.push({
               file_path: CLOUDINARY_URL,
               user_id: randomUserId,
               company_id: randomCompanyId,
               captured_at: dateTime,
               uploaded_at: dateTime,
            })
         }

         await db.table('screenshots').insert(rows)

         console.log(
            `Inserted ${Math.min(offset + BATCH_SIZE, TOTAL_SCREENSHOTS)} / ${TOTAL_SCREENSHOTS}`
         )
      }

      console.log('Seeding completed successfully')
   }
   private randomTimeFromLastSevenDays() {
      const days = Math.floor(Math.random() * 7)
      const hours = 9 + Math.floor(Math.random() * 9) // 9 am to 6 pm
      const minutes = Math.floor(Math.random() * 60)

      return DateTime.now().minus({ days, hours, minutes }).toJSDate()
   }
}
