import Plan from '#models/plan'
import User from '#models/user'
import { ForgotPasswordType, LoginType, RegisterType, ResetPasswordType } from './auth.type.js'
import Company from '#models/company'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import env from '#start/env'
import { cookieConfig } from '../../helper/jwt_cookie.js'
import { Exception } from '@adonisjs/core/exceptions'
import PasswordResetOtp from '#models/password_reset_otp'
import { DateTime } from 'luxon'
import crypto from 'node:crypto'

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

   async forgotPassword(payload: ForgotPasswordType) {
      const user = await User.query().where('email', payload.email).first()

      // Always return success to prevent email enumeration
      if (!user) {
         return { message: 'If an account exists with this email, you will receive an OTP shortly.' }
      }

      // Delete any existing OTPs for this email
      await PasswordResetOtp.query().where('email', payload.email).delete()

      // Generate 6-digit OTP
      const otp = crypto.randomInt(100000, 999999).toString()

      // Store hashed OTP with 10-minute expiry
      await PasswordResetOtp.create({
         email: payload.email,
         otp: await hash.make(otp),
         expiresAt: DateTime.now().plus({ minutes: 10 }),
      })

      // TODO: Replace with actual email sending
      console.log(`[OTP] Password reset OTP for ${payload.email}: ${otp}`)

      return { message: 'If an account exists with this email, you will receive an OTP shortly.' }
   }

   async resetPassword(payload: ResetPasswordType) {
      const otpRecord = await PasswordResetOtp.query()
         .where('email', payload.email)
         .orderBy('created_at', 'desc')
         .first()

      if (!otpRecord) {
         throw new Exception('Invalid or expired OTP.', { status: 400 })
      }

      if (otpRecord.expiresAt < DateTime.now()) {
         await otpRecord.delete()
         throw new Exception('OTP has expired. Please request a new one.', { status: 400 })
      }

      const isValid = await hash.verify(otpRecord.otp, payload.otp)
      if (!isValid) {
         throw new Exception('Invalid OTP.', { status: 400 })
      }

      const user = await User.query().where('email', payload.email).first()
      if (!user) {
         throw new Exception('User not found.', { status: 404 })
      }

      user.password = payload.password
      await user.save()

      // Clean up all OTPs for this email
      await PasswordResetOtp.query().where('email', payload.email).delete()

      return { message: 'Password reset successfully.' }
   }
}
