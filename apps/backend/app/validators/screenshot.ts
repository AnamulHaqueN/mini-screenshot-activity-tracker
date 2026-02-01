import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { DateTime } from 'luxon'

const uploadSchema = vine.object({
   screenshot: vine.file({
      size: '10mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp'],
   }),

   capturedAt: vine
      .string()
      .transform((value) => {
         const parsed = DateTime.fromISO(value)
         if (!parsed.isValid) {
            throw new Error(
               'Invalid datetime format. Use ISO 8601 format (e.g., 2025-12-30T15:30:00)'
            )
         }
         return parsed
      })
      .optional(),
})

export const uploadScreenshotValidator = vine.compile(uploadSchema)
uploadScreenshotValidator.messagesProvider = new SimpleMessagesProvider({
   'screenshot.required': 'Screenshot is required.',
   'screenshot.file': 'Screenshot must be a valid file.',
   'screenshot.size': 'Screenshot must be less than 10MB.',
   'screenshot.extname': 'Screenshot must be a JPG, JPEG, PNG, or WebP file.',
   'capturedAt.iso': 'Captured at must be a valid ISO 8601 date time.',
})

const groupedScreenshotsSchema = vine.object({
   date: vine.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
})

export const groupedScreenshotsValidator = vine.compile(groupedScreenshotsSchema)
groupedScreenshotsValidator.messagesProvider = new SimpleMessagesProvider({
   'date.regex': 'Date must be in YYYY-MM-DD format.',
})

export const getScreenshotsValidator = vine.compile(
   vine.object({
      employeeId: vine.number().positive().optional(),
      //date: vine.date().optional(),
      page: vine.number().positive().optional(),
      limit: vine.number().positive().withoutDecimals().range([1, 100]).optional(),
   })
)
