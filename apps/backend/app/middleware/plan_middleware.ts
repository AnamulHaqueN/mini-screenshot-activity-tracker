import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class PlanMiddleware {
   async handle(ctx: HttpContext, next: NextFn, email: string) {
      const user = ctx.auth.user

      if (!user || user.email !== email) {
         return ctx.response.unauthorized({ message: 'Not allowed' })
      }
      await next()
   }
}
