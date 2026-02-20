import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'

import crypto from 'crypto'
const verificationTokens: Record<string, string> = {}

export default class TestEmailController {
   public async send({ request, response }: HttpContext) {
      // 1️⃣ Get email from request
      const userEmail = request.input('email')
      console.log('first', userEmail)

      if (!userEmail) {
         return response.badRequest({ message: 'Email is required' })
      }

      // 2️⃣ Generate a verification code
      const token = crypto.randomBytes(32).toString('hex')
      console.log('before token', token)
      verificationTokens[token] = userEmail
      console.log('verificationToken', verificationTokens[token])

      const link = `http://localhost:3333/verify-email?token=${token}`

      // 3️⃣ Send email
      await mail.send((message) => {
         message
            .to(userEmail)
            .subject('Test Verification link')
            .html(`<p>Click this link to verify your email: <a href="${link}">Verify Email</a></p>`)
      })
      return response.ok({ message: 'Verification link sent !', link })
   }

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
