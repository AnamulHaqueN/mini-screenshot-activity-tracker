import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

/**
 * Validator for screenshot upload
 */
export const uploadScreenshotValidator = vine.compile(
   vine.object({
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
)

/**
 * Validator for grouped screenshots query
 */
export const groupedScreenshotsValidator = vine.compile(
   vine.object({
      date: vine.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
   })
)

export const getScreenshotsValidator = vine.compile(
   vine.object({
      employeeId: vine.number().positive().optional(),
      //date: vine.date().optional(),
      page: vine.number().positive().optional(),
      limit: vine.number().positive().withoutDecimals().range([1, 100]).optional(),
   })
)
