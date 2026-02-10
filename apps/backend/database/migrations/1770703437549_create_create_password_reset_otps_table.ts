import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
   protected tableName = 'password_reset_otps'

   async up() {
      this.schema.createTable(this.tableName, (table) => {
         table.increments('id').primary()
         table.string('email', 255).notNullable()
         table.string('otp', 255).notNullable()
         table.timestamp('expires_at').notNullable()
         table.timestamp('created_at').notNullable().defaultTo(this.now())

         table.index('email')
      })
   }

   async down() {
      this.schema.dropTable(this.tableName)
   }
}
