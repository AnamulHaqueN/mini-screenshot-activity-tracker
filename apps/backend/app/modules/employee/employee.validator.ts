import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const addEmployeeSchema = vine.object({
   name: vine.string().trim().minLength(2).maxLength(255),
   email: vine.string().trim().email().normalizeEmail(),
   password: vine.string().minLength(4).maxLength(255),
})

export const addEmployeeValidator = vine.compile(addEmployeeSchema)
addEmployeeValidator.messagesProvider = new SimpleMessagesProvider({
   'name.required': 'Name is required to add an employee.',
   'name.minLength': 'Name must be at least 2 characters long.',
   'name.maxLength': 'Name cannot be longer than 255 characters.',
   'email.required': 'Email is required to login.',
   'email.email': 'Please enter a valid email address.',
   'password.required': 'Password is required to login.',
   'password.minLength': 'Password must be at least 4 characters long.',
})
