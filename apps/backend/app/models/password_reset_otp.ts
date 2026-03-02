import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class PasswordResetOtp extends BaseModel {
   @column({ isPrimary: true })
   declare id: number

   @column()
   declare email: string

   @column()
   declare otp: string

   @column.dateTime()
   declare expiresAt: DateTime

   @column.dateTime({ autoCreate: true })
   declare createdAt: DateTime
}
