import User from '#models/user'
import db from '@adonisjs/lucid/services/db'

export class EmployeeService {
   static async stats(employees: User[]) {
      // screenshot count, last screenshot taken time as last-activity
      const employeesWithStats = await Promise.all(
         employees.map(async (employee) => {
            const screenshotCount = await db
               .from('screenshots')
               .where('user_id', employee.id)
               .count('* as total')
               .first()

            const lastScreenshot = await db
               .from('screenshots')
               .where('user_id', employee.id)
               .orderBy('captured_at', 'desc')
               .select('captured_at')
               .first()

            return {
               ...employee.toJSON(),
               screenshot_count: screenshotCount?.total || 0,
               last_screenshot_at: lastScreenshot?.captured_at || null,
            }
         })
      )
      return employeesWithStats
   }
}
