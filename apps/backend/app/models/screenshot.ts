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
  declare captureTime: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>
}
