import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'

import crypto from 'crypto'
const verificationTokens: Record<string, string> = {}

export default class TestEmailController {
   public async verify({ request, response }: HttpContext) {
      const token = request.input('token')
      console.log('token from verify', token)
      if (!token) {
         return response.badRequest({ message: 'Invalid or expired token' })
      }
      const user = await User.findBy('verification_token', token)
      if (!user) {
         return response.badRequest({ message: 'Invalid or expired token' })
      }

      const email = user.email
      console.log('verify email', email)
      user.isVerified = true
      await user.save()
      console.log('verify isVerified', user.isVerified)

      return response.ok({ message: `Email ${email} verified successfully !` })
   }
}
