import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Plan from './plan.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Screenshot from './screenshot.js'
import User from './user.js'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare planId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Plan)
  declare plan: BelongsTo<typeof Plan>

  @hasMany(() => User)
  declare users: HasMany<typeof User>

  @hasMany(() => Screenshot)
  declare screenshots: HasMany<typeof Screenshot>
}
