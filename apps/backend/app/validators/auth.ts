import vine from '@vinejs/vine'

export const registerCompanyValidator = vine.compile(
  vine.object({
    ownerName: vine.string().trim().minLength(2).maxLength(255),

    ownerEmail: vine.string().trim().email().normalizeEmail().unique({
      table: 'users',
      column: 'email',
    }),

    password: vine.string().minLength(4).maxLength(255),

    companyName: vine.string().trim().minLength(2).maxLength(255),

    planId: vine.number().positive().exists({
      table: 'plans',
      column: 'id',
    }),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().normalizeEmail(),
    password: vine.string().minLength(4),
  })
)

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
