import Company from '#models/company'
import Plan from '#models/plan'
import User from '#models/user'
import { loginValidator, registerCompanyValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { cookieConfig } from '../helper/jwt_cookie.js'

export default class AuthController {
  async registerCompany({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerCompanyValidator)

    //check if plan exists
    const plan = await Plan.findOrFail(data.planId)

    // Create Company
    const company = await Company.create({
      name: data.companyName,
      planId: plan.id,
    })

    // Create owner user
    const owner = await User.create({
      name: data.ownerName,
      email: data.ownerEmail,
      password: data.password,
      companyId: company.id,
      role: 'owner',
      isActive: true,
    })

    // Generate JWT token
    const token = await User.accessTokens.create(owner, ['*'], { expiresIn: '7 days' })

    return response.created({
      message: 'Company registered successfully',
      data: {
        company: {
          id: company.id,
          name: company.name,
          planId: company.planId,
        },
        owner: {
          id: owner.id,
          name: owner.name,
          email: owner.email,
          role: owner.role,
        },
        token: token.value!.release(),
      },
    })
  }

  async login({ auth, request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    // Find user
    const user = await User.query().where('email', email).where('isActive', true).first()

    if (!user) {
      return response.unauthorized({ message: 'Please enter valid email and password' })
    }

    // Verify password
    const isPasswordValid = await hash.verify(user.password, password)
    if (!isPasswordValid) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }

    // const token = await User.accessTokens.create(user, ['*'], { expiresIn: '7 days' })

    const token = await auth.use('jwt').generate(user)
    response.cookie('jwt_token', token.token, cookieConfig())

    return response.ok({
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          companyId: user.companyId,
        },
      },
    })
  }

  async logout({ response }: HttpContext) {
    response.clearCookie('jwt_token')

    return response.ok({ message: 'Logout successful' })
  }

  async me({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    await user.load('company')

    return response.ok({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyId: user.companyId,
        company: user.company,
      },
    })
  }
}
