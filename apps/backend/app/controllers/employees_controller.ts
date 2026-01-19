import User from '#models/user'
import { addEmployeeValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class EmployeesController {
  async index({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const employees = await User.query()
      .where('company_id', user.companyId)
      .where('role', 'employee')
      .orderBy('name', 'asc')

    return response.ok({ data: employees })
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const data = await request.validateUsing(addEmployeeValidator)

    // Check if email already exists in company
    const existingEmployee = await User.query()
      .where('email', data.email)
      .where('company_id', user.companyId)
      .first()

    if (existingEmployee) {
      return response.conflict({ message: 'Employee with this email already exists' })
    }

    // Create employee
    const employee = await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      companyId: user.companyId,
      role: 'employee',
      isActive: true,
    })

    return response.created({
      message: 'Employee added successfully',
      data: {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    })
  }

  async show({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const employee = await User.query()
      .where('id', params.id)
      .where('company_id', user.companyId)
      .where('role', 'employee')
      .first()

    if (!employee) {
      return response.notFound({ message: 'Employee not found' })
    }

    return response.ok({ data: employee })
  }

  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const employee = await User.query()
      .where('id', params.id)
      .where('company_id', user.companyId)
      .where('role', 'employee')
      .first()

    if (!employee) {
      return response.notFound({ message: 'Employee not found' })
    }

    const { isActive } = request.only(['isActive'])

    if (typeof isActive === 'boolean') {
      employee.isActive = isActive
      await employee.save()
    }

    return response.ok({
      message: 'Employee updated successfully',
      data: employee,
    })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const employee = await User.query()
      .where('id', params.id)
      .where('company_id', user.companyId)
      .where('role', 'employee')
      .first()

    if (!employee) {
      return response.notFound({ message: 'Employee not found' })
    }

    await employee.delete()

    return response.ok({ message: 'Employee deleted successfully' })
  }

  async search({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const { name } = request.qs()

    const employees = await User.query()
      .where('company_id', user.companyId)
      .where('role', 'employee')
      .whereILike('name', `%${name}%`)
      .orderBy('name', 'asc')

    return response.ok({ data: employees })
  }
}
