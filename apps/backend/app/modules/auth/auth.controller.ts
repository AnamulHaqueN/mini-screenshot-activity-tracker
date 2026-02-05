import User from '#models/user'
import { loginValidator, signUpValidator } from '#modules/auth/auth.validator'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { cookieConfig } from '../../helper/jwt_cookie.js'
import env from '#start/env'
import { AuthService } from './auth.service.js'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthController {
   constructor(private authService: AuthService) {}

   async register({ request, response }: HttpContext) {
      const payload = await request.validateUsing(signUpValidator)
      const res = await this.authService.register(payload)
      return response.created(res)
   }

   async login({ auth, request, response }: HttpContext) {
      const { email, password } = await request.validateUsing(loginValidator)

      const user = await User.query().where('email', email).first()

      if (!user) {
         return response.unauthorized({ message: 'Invalid credentials' })
      }

      const isPasswordValid = await hash.verify(user.password, password)
      if (!isPasswordValid) {
         return response.unauthorized({ message: 'Invalid credentials' })
      }

      // Pass role as cookie for the proxy.ts (next.js frontend) to manage authorization
      response.plainCookie('role', user.role, {
         httpOnly: true,
         maxAge: env.get('SESSION_MAX_AGE'),
      })

      await auth.use('web').login(user)

      const token = await auth.use('jwt').generate(user)
      response.cookie('token', token.token, cookieConfig())

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

   async logout({ auth, response }: HttpContext) {
      response.clearCookie('jwt_token')
      auth.use('web').logout()
      response.clearCookie('role')

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
