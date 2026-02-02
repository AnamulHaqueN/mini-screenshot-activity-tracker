import Database from '@adonisjs/lucid/services/db'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class ScreenshotSeeder extends BaseSeeder {
  public async run() {
    const TOTAL = 500_000
    const CHUNK_SIZE = 1000

    console.log('Seeding screenshots (no faker)...')

    // Fetch all employee users
    const employees = await User.query().where('role', 'employee').select('id', 'company_id')

    if (employees.length === 0) {
      throw new Error('No employees found')
    }

    const rows: any[] = []

    for (let i = 1; i <= TOTAL; i++) {
      const employee = employees[Math.floor(Math.random() * employees.length)]
      const timestamp = Date.now()

      rows.push({
        file_path: this.generateFilePath(employee.companyId, employee.id, timestamp),
        user_id: employee.id,
        company_id: employee.companyId,
        capture_time: this.randomLast7Days(),
        created_at: new Date(),
      })

      if (rows.length === CHUNK_SIZE) {
        await Database.table('screenshots').insert(rows)
        rows.length = 0
        console.log(`Inserted ${i} screenshots`)
      }
    }

    if (rows.length > 0) {
      await Database.table('screenshots').insert(rows)
    }

    console.log('🎉 Screenshot seeding completed')
  }

  /**
   * Match your existing Cloudinary file_path pattern
   */
  private generateFilePath(companyId: number, userId: number, timestamp: number) {
    const imageNumber = Math.floor(Math.random() * 10) + 1

    return `https://res.cloudinary.com/dv1lgs6pw/image/upload/v1767683964/screenshots/1/3/1767683961985_Pasted%20image%20%286%29.png.png`
  }

  /**
   * Random time within last 7 days
   */
  private randomLast7Days() {
    const days = Math.floor(Math.random() * 7)
    const hours = Math.floor(Math.random() * 24)
    const minutes = Math.floor(Math.random() * 60)

    return DateTime.now().minus({ days, hours, minutes }).toJSDate()
  }
}
