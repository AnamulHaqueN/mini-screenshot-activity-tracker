import {
   forgotPasswordValidator,
   loginValidator,
   resetPasswordValidator,
   signUpValidator,
} from '#modules/auth/auth.validator'
import type { HttpContext } from '@adonisjs/core/http'
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

   async login(ctx: HttpContext) {
      const payload = await ctx.request.validateUsing(loginValidator)
      const user = (await this.authService.login(ctx, payload)) ?? null
      return ctx.response.ok({
         message: 'Login successful',
         data: { user },
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

   async forgotPassword({ request, response }: HttpContext) {
      const payload = await request.validateUsing(forgotPasswordValidator)
      const res = await this.authService.forgotPassword(payload)
      return response.ok(res)
   }

   async resetPassword({ request, response }: HttpContext) {
      const payload = await request.validateUsing(resetPasswordValidator)
      const res = await this.authService.resetPassword(payload)
      return response.ok(res)
   }
}
