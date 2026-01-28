import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker/locale/zu_ZA'
import Database from '@adonisjs/lucid/services/db'
export default class CompanySeeder extends BaseSeeder {
   async run() {
      const companies = []

      for (let i = 0; i < 100; i++) {
         companies.push({
            name: faker.company.name(),
            plan_id: faker.number.int({ min: 1, max: 3 }), // Assuming there are 3 plans with IDs 1, 2, and 3
         })
      }
      await Database.table('companies').insert(companies)
   }
}
