import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Company from './company.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import type { PlanName } from '#modules/plans/plans.type'

export default class Plan extends BaseModel {
   @column({ isPrimary: true })
   declare id: number

   @column()
   declare name: PlanName

   @column()
   declare pricePerEmployee: number

   @column.dateTime({ autoCreate: true })
   declare createdAt: DateTime

   @column.dateTime({ autoCreate: true, autoUpdate: true })
   declare updatedAt: DateTime

   @hasMany(() => Company)
   declare companies: HasMany<typeof Company>
}
