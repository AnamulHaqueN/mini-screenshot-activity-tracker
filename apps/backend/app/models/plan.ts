import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Company from './company.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
export type PlanName = 'basic' | 'pro' | 'enterprise'

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: PlanName

  @column()
  declare price_per_employee: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Company)
  declare companies: HasMany<typeof Company>
}
