import Plan from '#models/plan'
import User from '#models/user'
import { LoginType, RegisterType } from './auth.type.js'
import Company from '#models/company'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import env from '#start/env'
import { cookieConfig } from '../../helper/jwt_cookie.js'
import { Exception } from '@adonisjs/core/exceptions'

export class AuthService {
   async register(data: RegisterType) {
      const plan = await Plan.findOrFail(data.planId)

      const company = await Company.create({
         name: data.companyName,
         planId: plan.id,
      })

      // Create owner or admin
      const user = await User.create({
         name: data.ownerName,
         email: data.ownerEmail,
         password: data.password,
         companyId: company.id,
         role: 'admin',
      })

      /**
       * Ignore access token creation in the time of registration
       * Token will be generated in login time
       */
      //  const token = await User.accessTokens.create(owner, ['*'], { expiresIn: '7 days' })

      return {
         message: 'Company registered successfully',
         data: {
            company: {
               id: company.id,
               name: company.name,
               planId: company.planId,
            },
            owner: {
               id: user.id,
               name: user.name,
               email: user.email,
               role: user.role,
            },
            // token: token.value!.release(),
         },
      }
   }

   async login(ctx: HttpContext, payload: LoginType) {
      const user = await User.query().where('email', payload.email).first()

      if (!user) {
         throw new Exception('Invalid credentials', {
            status: 401,
            code: 'E_INVALID_CREDENTIALS',
         })
      }

      const isPasswordValid = await hash.verify(user.password, payload.password)
      if (!isPasswordValid) {
         throw new Exception('Invalid credentials', {
            status: 401,
            code: 'E_INVALID_CREDENTIALS',
         })
      }

      // Pass role as cookie for the proxy.ts (next.js frontend) to manage authorization
      ctx.response.plainCookie('role', user.role, {
         httpOnly: true,
         maxAge: env.get('SESSION_MAX_AGE'),
      })

      await ctx.auth.use('web').login(user)

      const token = await ctx.auth.use('jwt').generate(user)
      ctx.response.cookie('token', token.token, cookieConfig())

      return {
         id: user.id,
         name: user.name,
         email: user.email,
         role: user.role,
         companyId: user.companyId,
      }
   }
}
