import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Company from './company.js'

export default class Screenshot extends BaseModel {
   @column({ isPrimary: true })
   declare id: number

   @column()
   declare filePath: string

   @column()
   declare userId: number

   @column()
   declare companyId: number

   @column.dateTime()
   declare capturedAt: DateTime

   @column.dateTime()
   declare uploadedAt: DateTime

   @column.dateTime({ autoCreate: true })
   declare createdAt: DateTime

   @belongsTo(() => User)
   declare user: BelongsTo<typeof User>

   @belongsTo(() => Company)
   declare company: BelongsTo<typeof Company>

   static calculateMinuteBucket(minute: number, intervalMinutes: number = 10): number {
      return Math.floor(minute / intervalMinutes) * intervalMinutes
   }

   static async getGroupedScreenshots(userId: number, date: DateTime) {
      const startOfDay = date.startOf('day')
      const endOfDay = date.endOf('day')

      const screenshots = await Screenshot.query()
         .where('user_id', userId)
         .whereBetween('captured_at', [startOfDay.toSQL()!, endOfDay.toSQL()!])
         .orderBy('captured_at', 'asc')

      const grouped: Record<number, Record<number, Screenshot[]>> = {}

      screenshots.forEach((screenshot) => {
         const hour = screenshot.capturedAt.hour
         const bucket = this.calculateMinuteBucket(screenshot.capturedAt.minute)

         if (!grouped[hour]) {
            grouped[hour] = {}
         }

         if (!grouped[hour][bucket]) {
            grouped[hour][bucket] = []
         }

         grouped[hour][bucket].push(screenshot)
      })

      return grouped
   }
}
