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

const forgotPasswordSchema = vine.object({
   email: vine.string().trim().email().normalizeEmail(),
})

export const forgotPasswordValidator = vine.compile(forgotPasswordSchema)
forgotPasswordValidator.messagesProvider = new SimpleMessagesProvider({
   'email.required': 'Email is required.',
   'email.email': 'Please enter a valid email address.',
})

const resetPasswordSchema = vine.object({
   email: vine.string().trim().email().normalizeEmail(),
   otp: vine.string().fixedLength(6),
   password: vine.string().minLength(4).maxLength(255),
   password_confirmation: vine.string().sameAs('password'),
})

export const resetPasswordValidator = vine.compile(resetPasswordSchema)
resetPasswordValidator.messagesProvider = new SimpleMessagesProvider({
   'email.required': 'Email is required.',
   'email.email': 'Please enter a valid email address.',
   'otp.required': 'OTP code is required.',
   'otp.fixedLength': 'OTP must be exactly 6 digits.',
   'password.required': 'Password is required.',
   'password.minLength': 'Password must be at least 4 characters long.',
   'password.maxLength': 'Password cannot be longer than 255 characters.',
   'password_confirmation.sameAs': 'Passwords do not match.',
})
