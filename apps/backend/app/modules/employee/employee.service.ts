import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { AddEmployeePayload } from './employee.type.js'
import { Exception } from '@adonisjs/core/exceptions'

export class EmployeeService {
   async stats(employees: User[]) {
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

   async index(ctx: HttpContext) {
      const page = Number(ctx.request.input('page', 1))
      const limit = 10

      const employees = await User.query()
         .where('company_id', ctx.auth.user!.companyId)
         .where('role', 'employee')
         .orderBy('name', 'asc')
         .paginate(page, limit)

      return {
         data: await this.stats(employees),
         meta: employees.getMeta(),
      }
   }

   async store(ctx: HttpContext, payload: AddEmployeePayload) {
      const user = ctx.auth.getUserOrFail()

      // Check if email already exists in company
      const existingEmployee = await User.query()
         .where('email', payload.email)
         .where('company_id', user.companyId)
         .first()

      if (existingEmployee) {
         throw new Exception('Employee with this email already exists', {
            status: 409,
            code: 'EMPLOYEE_EXISTS',
         })
      }

      const employee = await User.create({
         name: payload.name,
         email: payload.email,
         password: payload.password,
         companyId: user.companyId,
         role: 'employee',
      })

      return {
         data: {
            id: employee.id,
            name: employee.name,
            email: employee.email,
            role: employee.role,
         },
      }
   }

   async destroy(ctx: HttpContext) {
      const user = ctx.auth.getUserOrFail()

      const employee = await User.query()
         .where('id', ctx.params.id)
         .where('company_id', user.companyId)
         .where('role', 'employee')
         .first()

      if (!employee) {
         throw new Exception('Employee not found', {
            status: 404,
            code: 'EMPLOYEE_NOT_FOUND',
         })
      }

      await employee.delete()
   }

   async search(ctx: HttpContext, user: User) {
      const { name } = ctx.request.qs()

      const employees = await User.query()
         .where('company_id', user.companyId)
         .where('role', 'employee')
         .whereILike('name', `%${name}%`)
         .orderBy('name', 'asc')

      return await this.stats(employees)
   }
}
