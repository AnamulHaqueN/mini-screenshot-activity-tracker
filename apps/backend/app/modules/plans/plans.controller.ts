import Plan from '#models/plan'
import type { HttpContext } from '@adonisjs/core/http'
import { planValidator } from './plan.validator.js'

export default class PlansController {
   async index({ response }: HttpContext) {
      const plans = await Plan.all()
      return response.ok({ data: plans })
   }
   async store({ request, response }: HttpContext) {
      const payload = await request.validateUsing(planValidator)

      const plan = await Plan.create(payload)
      console.log('here is my payload', payload)
      return response.created({
         message: 'Plan created successfully',
         data: plan,
      })
   }
}
