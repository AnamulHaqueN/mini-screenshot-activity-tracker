import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('email', 255).notNullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.string('password', 255).notNullable()
      table.integer('company_id').unsigned().notNullable()
      table.enum('role', ['owner', 'employee']).notNullable()
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').notNullable().defaultTo(this.now())

      table.unique(['email', 'company_id'])
      table.foreign('company_id').references('id').inTable('companies').onDelete('CASCADE')

      table.index('email')
      table.index('company_id')
      table.index('role')
      table.index(['company_id', 'role'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
