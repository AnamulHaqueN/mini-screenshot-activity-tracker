import vine from '@vinejs/vine'

export const addEmployeeValidator = vine.compile(
   vine.object({
      name: vine.string().trim().minLength(2).maxLength(255),
      email: vine.string().trim().email().normalizeEmail().unique({
         table: 'users',
         column: 'email',
      }),
      password: vine.string().minLength(4).maxLength(255),
   })
)
