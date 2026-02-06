import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const signUpSchema = vine.object({
   ownerName: vine.string().trim().minLength(2).maxLength(255),
   ownerEmail: vine.string().trim().email().normalizeEmail(),
   password: vine.string().minLength(4).maxLength(255),
   companyName: vine.string().trim().minLength(2).maxLength(255),
   planId: vine.number().positive(),
})

export const signUpValidator = vine.compile(signUpSchema)
signUpValidator.messagesProvider = new SimpleMessagesProvider({
   'ownerName.minLength': 'ownerName must be at least 2 characters long.',
   'ownerName.maxLength': 'ownerName cannot be longer than 255 characters.',

   'ownerEmail.required': 'Email is required to create an account.',
   'ownerEmail.email': 'Please enter a valid email address.',

   'password.required': 'You must choose a password.',
   'password.minLength': 'Password must be at least 4 characters long.',
   'password.maxLength': 'Password cannot be longer than 255 characters.',

   'companyName.minLength': 'companyName must be at least 2 characters long.',
   'companyName.maxLength': 'companyName cannot be longer than 255 characters.',
})

const loginSchema = vine.object({
   email: vine.string().trim().email().normalizeEmail(),
   password: vine.string().minLength(4),
})

export const loginValidator = vine.compile(loginSchema)
loginValidator.messagesProvider = new SimpleMessagesProvider({
   'email.required': 'Email is required to login.',
   'email.email': 'Please enter a valid email address.',
   'password.required': 'Password is required to login.',
   'password.minLength': 'Password must be at least 4 characters long.',
})
