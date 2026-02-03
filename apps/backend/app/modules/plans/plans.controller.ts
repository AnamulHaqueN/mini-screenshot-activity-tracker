import Plan from '#models/plan'
import type { HttpContext } from '@adonisjs/core/http'

export default class PlansController {
   async index({ response }: HttpContext) {
      const plans = await Plan.all()
      return response.ok({ data: plans })
   }
   async store({ request, response }: HttpContext) {
      console.log(request)
      // const plan = await Plan.create({
      //    name: pla,
      // })
   }
}
