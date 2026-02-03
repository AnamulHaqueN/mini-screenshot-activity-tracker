import Plan from '#models/plan'
import type { HttpContext } from '@adonisjs/core/http'

export default class PlansController {
   async index({ response }: HttpContext) {
      const plans = await Plan.all()
      return response.ok({ data: plans })
   }
   async store({ request, response }: HttpContext) {
      const data = request.only(['name', 'price'])

      const plans = await Plan.create({
         name: data.name,
         pricePerEmployee: data.price,
      })

      return response.created({
         message: 'Plan created successfully',
         data: {
            name: plans.name,
            price: plans.pricePerEmployee,
         },
      })
   }
}
