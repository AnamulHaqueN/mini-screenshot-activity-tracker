import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
   protected tableName = 'plans'

   async up() {
      this.schema.createTable(this.tableName, (table) => {
         table.increments('id').primary()
         table.string('name').notNullable().unique()
         table.string('description').nullable()
         table.decimal('price').notNullable()
         table.string('period').nullable()
         table.string('note').nullable()
         table.string('features', 1000).nullable()
         table.boolean('highlight').nullable()
         table.timestamp('created_at').notNullable().defaultTo(this.now())
         table.timestamp('updated_at').notNullable().defaultTo(this.now())
      })
   }

   async down() {
      this.schema.dropTable(this.tableName)
   }
}
