import { EmployeeService } from '#modules/employee/employee.service'
import { addEmployeeValidator } from '#modules/employee/employee.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class EmployeeController {
   constructor(private employeeService: EmployeeService) {}

   /**
    * Get all employees
    */
   async index(ctx: HttpContext) {
      const res = await this.employeeService.index(ctx)
      return ctx.response.ok(res)
   }

   /**
    * Add employee
    */
   async store(ctx: HttpContext) {
      const payload = await ctx.request.validateUsing(addEmployeeValidator)
      const res = await this.employeeService.store(ctx, payload)
      return ctx.response.created({
         message: 'Employee added successfully',
         data: res?.data,
      })
   }

   async destroy(ctx: HttpContext) {
      await this.employeeService.destroy(ctx)
      return ctx.response.ok({ message: 'Employee deleted successfully' })
   }

   async search(ctx: HttpContext) {
      const user = ctx.auth.getUserOrFail()
      const employees = await this.employeeService.search(ctx, user)
      return ctx.response.ok({ data: employees })
   }
}
