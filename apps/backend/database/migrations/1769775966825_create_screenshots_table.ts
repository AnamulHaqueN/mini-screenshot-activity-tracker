import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
   protected tableName = 'screenshots'

   async up() {
      this.schema.createTable(this.tableName, (table) => {
         table.increments('id').primary()
         table.text('file_path').notNullable()
         table.integer('user_id').unsigned().notNullable()
         table.integer('company_id').unsigned().notNullable()
         table.string('captured_at')
         table.string('uploaded_at')

         table.timestamp('created_at').notNullable().defaultTo(this.now())

         table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
         table.foreign('company_id').references('id').inTable('companies').onDelete('CASCADE')

         // Critical indexes for performance with 1M+ records

         table.index(['user_id', 'captured_at'], 'idx_user_captured_at')
         // table.index(['company_id', 'captured_at'], 'idx_company_captured_at')
      })
   }

   async down() {
      this.schema.dropTable(this.tableName)
   }
}
