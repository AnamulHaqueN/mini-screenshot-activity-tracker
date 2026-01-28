import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
   protected tableName = 'screenshots'

   async up() {
      this.schema.createTable(this.tableName, (table) => {
         table.increments('id').primary()
         table.text('file_path').notNullable()
         table.integer('user_id').unsigned().notNullable()
         table.integer('company_id').unsigned().notNullable()
         table.timestamp('capture_time').notNullable()

         table.timestamp('created_at').notNullable().defaultTo(this.now())

         table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
         table.foreign('company_id').references('id').inTable('companies').onDelete('CASCADE')

         // Critical indexes for performance with 1M+ records

         table.index(['user_id', 'capture_time'], 'idx_user_capture_time')
         table.index(['company_id', 'capture_time'], 'idx_company_capture_time')

         table.index('capture_time')
      })
   }

   async down() {
      this.schema.dropTable(this.tableName)
   }
}
