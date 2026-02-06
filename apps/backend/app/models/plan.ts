import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Company from './company.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Plan extends BaseModel {
   @column({ isPrimary: true })
   declare id: number

   @column()
   declare name: string

   @column()
   declare description?: string | null

   @column()
   declare price: number

   @column()
   declare period?: string | null

   @column()
   declare note?: string | null

   @column({
      prepare: (value) => JSON.stringify(value),
      consume: (value) => JSON.parse(value),
   })
   declare features?: string[] | null

   @column()
   declare highlight?: boolean | null

   @column.dateTime({ autoCreate: true })
   declare createdAt: DateTime

   @column.dateTime({ autoCreate: true, autoUpdate: true })
   declare updatedAt: DateTime

   @hasMany(() => Company)
   declare companies: HasMany<typeof Company>
}
