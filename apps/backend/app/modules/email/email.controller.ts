import { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'

import crypto from 'crypto'

export default class TestEmailController {
   public async send({ request, response }: HttpContext) {
      // 1️⃣ Get email from request
      const userEmail = request.input('email')
      console.log('first', userEmail)

      if (!userEmail) {
         return response.badRequest({ message: 'Email is required' })
      }

      // 2️⃣ Generate a verification code
      const verificationCode = crypto.randomInt(100000, 999999).toString()

      // 3️⃣ Send email
      await mail.send((message) => {
         message
            .to(userEmail)
            .subject('Test Verification Code')
            .html(`<p>Your verification code is: <strong>${verificationCode}</strong></p>`)
      })

      return response.ok({ message: 'Verification email sent!', code: verificationCode })
   }
}
