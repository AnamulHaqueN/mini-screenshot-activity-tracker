import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class NotFoundException extends Exception {
   static status = 404
   static code = 'E_NOT_FOUND'
   static message = 'Not found'

   async handle(error: this, ctx: HttpContext) {
      ctx.response.status(error.status).json({
         message: error.message,
      })
   }
}
