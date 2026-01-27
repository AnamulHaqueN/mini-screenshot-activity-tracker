import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
   protected tableName = 'screenshots'

   async up() {
      this.schema.alterTable(this.tableName, (table) => {
         table.string('uploaded_at')
      })
   }

   async down() {
      this.schema.dropTable(this.tableName)
   }
}
