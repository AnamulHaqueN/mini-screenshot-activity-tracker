import cloudinary from '#config/cloudinary'
import Screenshot from '#models/screenshot'
import User from '#models/user'
import { getScreenshotsValidator, uploadScreenshotValidator } from '#validators/screenshot'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class ScreenshotsController {
   /**
    * Upload screenshot (Employee only)
    */
   async upload({ auth, request, response }: HttpContext) {
      const user = auth.getUserOrFail()

      //  if (!user.isActive) {
      //    return response.forbidden({ message: 'Your account is inactive' })
      //  }

      const { screenshot } = await request.validateUsing(uploadScreenshotValidator)

      try {
         // Upload to Cloudinary
         const uploadResult = await cloudinary.uploader.upload(screenshot.tmpPath!, {
            folder: `screenshots/${user.companyId}/${user.id}`,
            resource_type: 'image',
            format: screenshot.extname,
            quality: 'auto',
            public_id: `${Date.now()}_${screenshot.clientName}`,
         })

         // Extract date, hour, and minute bucket from capture time
         const captureDateTime = DateTime.now().setZone('Asia/Dhaka')
         const date = captureDateTime.toISODate()!
         const hour = captureDateTime.hour
         const minute = captureDateTime.minute
         const minuteBucket = Math.floor(minute / 10) * 10 // Group by 10-minute intervals

         // Save screenshot record
         const screenshotRecord = await Screenshot.create({
            filePath: uploadResult.secure_url,
            userId: user.id,
            companyId: user.companyId,
            capturedAt: captureDateTime,
            uploadedAt: DateTime.now(),
         })

         return response.created({
            message: 'Screenshot uploaded successfully',
            data: {
               id: screenshotRecord.id,
               filePath: screenshotRecord.filePath,
               capturedAt: screenshotRecord.capturedAt,
               date: date,
               hour: hour,
               minuteBucket: minuteBucket,
            },
         })
      } catch (error) {
         console.error('Cloudinary upload error:', error)
         return response.internalServerError({
            message: 'Failed to upload screenshot',
            error: error.message,
         })
      }
   }

   /**
    * Get all screenshots with pagination (Owner only)
    */
   async index({ auth, request, response }: HttpContext) {
      const user = auth.getUserOrFail()

      const {
         employeeId,
         //date,
         page = 1,
         limit = 10,
      } = await request.validateUsing(getScreenshotsValidator)

      const query = Screenshot.query()
         .where('company_id', user.companyId)
         .preload('user', (userQuery) => {
            userQuery.select('id', 'name', 'email')
         })
         .orderBy('capture_time', 'desc')

      if (employeeId) {
         // Verify employee belongs to company
         const employee = await User.query()
            .where('id', employeeId)
            .where('company_id', user.companyId)
            .where('role', 'employee')
            .first()

         if (!employee) {
            return response.notFound({ message: 'Employee not Found' })
         }

         query.where('user_id', employeeId)
      }

      const screenshots = await query.paginate(page, limit)
      return response.ok({
         data: screenshots.serialize({
            fields: {
               pick: ['id', 'filePath', 'capturedAt', 'date', 'hour', 'minuteBucket', 'createdAt'],
            },
            relations: {
               user: {
                  fields: {
                     pick: ['id', 'name', 'email'],
                  },
               },
            },
         }),
      })
   }

   /**
    * Get screenshots grouped by hour and 5-minute intervals (Owner only)
    * This is the main view for the dashboard
    */
   async getGroupedScreenshots({ auth, request, response }: HttpContext) {
      const user = await auth.getUserOrFail()

      const employeeId = Number(request.input('employeeId'))
      const dateString = request.input('date')

      if (!employeeId || !dateString) {
         return response.badRequest({
            message: 'employeeId and date are required',
         })
      }

      const date = DateTime.fromISO(dateString, { zone: 'Asia/Dhaka' })
      if (!date.isValid) {
         return response.badRequest({
            error: 'Invalid date format. Use YYYY-MM-DD',
         })
      }

      // Verify employee belongs to company
      const employee = await User.query()
         .where('id', employeeId)
         .where('company_id', user.companyId)
         .where('role', 'employee')
         .first()

      if (!employee) {
         return response.notFound({ message: 'Employee not found' })
      }

      const grouped = await Screenshot.getGroupedScreenshots(employeeId, date)
      const groupedArray: any[] = []

      for (const [hour, buckets] of Object.entries(grouped)) {
         for (const [bucket, screenshots] of Object.entries(buckets)) {
            const screenshotData = await Promise.all(
               screenshots.map(async (s: any) => {
                  const data: any = {
                     id: s.id,
                     filePath: s.filePath,
                     capturedAt: s.capturedAt.toISO(),
                  }

                  return data
               })
            )

            const bucketStart = DateTime.fromObject({
               year: date.year,
               month: date.month,
               day: date.day,
               hour: Number(hour),
               minute: Number(bucket),
            })

            const interval = 10
            const bucketEnd = bucketStart.plus({ minutes: interval })

            groupedArray.push({
               hour: bucketStart.hour,
               minuteBucket: bucketStart.minute,
               timeRange: `${bucketStart.toFormat('HH:mm')} - ${bucketEnd.toFormat('HH:mm')}`,
               count: screenshots.length,
               screenshots: screenshotData,
            })
         }
      }

      groupedArray.sort((a, b) => {
         if (a.hour !== b.hour) return a.hour - b.hour
         return a.minuteBucket - b.minuteBucket
      })

      // Statistics
      const hoursActive = Object.keys(groupedArray).length

      return response.ok({
         employee: {
            id: employee.id,
            name: employee.name,
         },
         date: date.toISODate(),
         statistics: {
            hoursActive,
            totalScreenshots: groupedArray.reduce((sum, g) => sum + g.count, 0),
         },
         groupedScreenshotsArray: groupedArray,
      })
   }

   async groupedAll({ auth, request, response }: HttpContext) {
      const user = await auth.getUserOrFail()

      const employeeId = Number(request.input('employeeId'))

      if (!employeeId) {
         return response.badRequest({
            message: 'employeeId is required',
         })
      }

      // Verify employee belongs to company
      const employee = await User.query()
         .where('id', employeeId)
         .where('company_id', user.companyId)
         .where('role', 'employee')
         .first()

      if (!employee) {
         return response.notFound({ message: 'Employee not found' })
      }

      // Fetch ALL screenshots for this employee
      const screenshots = await Screenshot.query()
         .where('company_id', user.companyId)
         .where('user_id', employeeId)
         .orderBy('capture_time', 'asc')

      // Group screenshots: hour -> minuteBucket
      const grouped: Record<number, Record<number, any[]>> = {}

      screenshots.forEach((screenshot) => {
         const time = screenshot.capturedAt
         const hour = time.hour
         const minuteBucket = Math.floor(time.minute / 5) * 5

         if (!grouped[hour]) grouped[hour] = {}
         if (!grouped[hour][minuteBucket]) grouped[hour][minuteBucket] = []

         grouped[hour][minuteBucket].push({
            id: screenshot.id,
            filePath: screenshot.filePath,
            capturedAt: screenshot.capturedAt,
         })
      })

      // Statistics
      const totalScreenshots = screenshots.length
      const hoursActive = Object.keys(grouped).length

      return response.ok({
         employee: {
            id: employee.id,
            name: employee.name,
         },
         statistics: {
            totalScreenshots,
            hoursActive,
            firstScreenshot: screenshots[0]?.capturedAt ?? null,
            lastScreenshot: screenshots[screenshots.length - 1]?.capturedAt ?? null,
         },
         screenshots: grouped,
      })
   }
}
