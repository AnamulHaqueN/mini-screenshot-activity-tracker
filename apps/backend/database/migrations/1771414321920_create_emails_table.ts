import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
   protected tableName = 'users'

   async up() {
      this.schema.alterTable(this.tableName, (table) => {
         table.string('verification_token').nullable()
         table.boolean('is_verified').defaultTo(false)
      })
   }

   async down() {
      this.schema.alterTable(this.tableName, (table) => {
         table.dropColumn('verification_token')
         table.dropColumn('is_verified')
      })
   }
}
