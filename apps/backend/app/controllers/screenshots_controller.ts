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

    if (!user.isActive) {
      return response.forbidden({ message: 'Your account is inactive' })
    }

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
      const minuteBucket = Math.floor(minute / 5) * 5 // Group by 5-minute intervals

      // Save screenshot record
      const screenshotRecord = await Screenshot.create({
        filePath: uploadResult.secure_url,
        userId: user.id,
        companyId: user.companyId,
        captureTime: captureDateTime,
      })

      return response.created({
        message: 'Screenshot uploaded successfully',
        data: {
          id: screenshotRecord.id,
          filePath: screenshotRecord.filePath,
          captureTime: screenshotRecord.captureTime,
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
          pick: ['id', 'filePath', 'captureTime', 'date', 'hour', 'minuteBucket', 'createdAt'],
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
  async grouped({ auth, request, response }: HttpContext) {
    const user = await auth.getUserOrFail()

    const employeeId = Number(request.input('employeeId'))
    const date = request.input('date') // yyyy-MM-dd

    if (!employeeId || !date) {
      return response.badRequest({
        message: 'employeeId and date are required',
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

    // Create date range (full day)
    const startOfDay = DateTime.fromISO(date).startOf('day')
    const endOfDay = startOfDay.endOf('day')

    // Fetch screenshots for that day
    const screenshots = await Screenshot.query()
      .where('company_id', user.companyId)
      .where('user_id', employeeId)
      .whereBetween('capture_time', [startOfDay.toJSDate(), endOfDay.toJSDate()])
      .orderBy('capture_time', 'asc')

    // Group screenshots: hour -> minuteBucket
    const grouped: Record<number, Record<number, any[]>> = {}

    screenshots.forEach((screenshot) => {
      const time = screenshot.captureTime
      const hour = time.hour
      const minuteBucket = Math.floor(time.minute / 5) * 5

      if (!grouped[hour]) grouped[hour] = {}
      if (!grouped[hour][minuteBucket]) grouped[hour][minuteBucket] = []

      grouped[hour][minuteBucket].push({
        id: screenshot.id,
        filePath: screenshot.filePath,
        captureTime: screenshot.captureTime,
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
      date,
      statistics: {
        totalScreenshots,
        hoursActive,
        firstScreenshot: screenshots[0]?.captureTime ?? null,
        lastScreenshot: screenshots[screenshots.length - 1]?.captureTime ?? null,
      },
      screenshots: grouped,
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
      const time = screenshot.captureTime
      const hour = time.hour
      const minuteBucket = Math.floor(time.minute / 5) * 5

      if (!grouped[hour]) grouped[hour] = {}
      if (!grouped[hour][minuteBucket]) grouped[hour][minuteBucket] = []

      grouped[hour][minuteBucket].push({
        id: screenshot.id,
        filePath: screenshot.filePath,
        captureTime: screenshot.captureTime,
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
        firstScreenshot: screenshots[0]?.captureTime ?? null,
        lastScreenshot: screenshots[screenshots.length - 1]?.captureTime ?? null,
      },
      screenshots: grouped,
    })
  }
}
