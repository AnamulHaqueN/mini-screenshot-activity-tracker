import cloudinary from '#config/cloudinary'
import Screenshot from '#models/screenshot'
import User from '#models/user'
import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import axios from 'axios'
import fs from 'node:fs'
import env from '#start/env'
import path from 'node:path'

export class ScreenshotService {
   async uploadToBunny(screenshot: any, user: any) {
      const ext = path.extname(screenshot.clientName)
      const fileName = `${Date.now()}${ext}`
      const remotePath = `screenshots/${user.companyId}/${user.id}/${fileName}`
      const fileBuffer = fs.readFileSync(screenshot.tmpPath!)

      console.log('Uploading to bunny cdn', {
         remotePath,
      })

      await axios.put(
         `https://storage.bunnycdn.com/${env.get('CDN_STORAGE_ZONE')}/${remotePath}`,
         fileBuffer,
         {
            headers: {
               'AccessKey': env.get('CDN_ACCESS_KEY'),
               'Content-Type': screenshot.type, // e.g. image/png
            },
            maxBodyLength: Infinity,
         }
      )

      // Example URL: https://storage.bunnycdn.com/ezystaff-storage/screenshots/12/55/170817123_test.png
      const fileUrl = `${env.get('CDN_FILE_HOST')}/${remotePath}`
      console.log('Uploaded to bunny cdn', {
         fileUrl,
      })

      return {
         filePath: remotePath,
         url: fileUrl,
      }
   }

   async uploadToCloudinary(screenshot: any, user: any) {
      return await cloudinary.uploader.upload(screenshot.tmpPath!, {
         folder: `screenshots/${user.companyId}/${user.id}`,
         resource_type: 'image',
         format: screenshot.extname,
         quality: 'auto',
         public_id: `${Date.now()}_${screenshot.clientName}`,
      })
   }

   async upload(ctx: HttpContext, screenshot: any) {
      const user = ctx.auth.getUserOrFail()
      try {
         const uploadResult = await this.uploadToBunny(screenshot, user)

         // Extract date, hour, and minute bucket from capture time
         const captureDateTime = DateTime.now().setZone('Asia/Dhaka')

         // Save screenshot record
         const screenshotRecord = await Screenshot.create({
            filePath: uploadResult.filePath,
            userId: user.id,
            companyId: user.companyId,
            capturedAt: captureDateTime,
            uploadedAt: DateTime.now(),
         })

         return {
            id: screenshotRecord.id,
            filePath: uploadResult.filePath,
            capturedAt: screenshotRecord.capturedAt,
         }
      } catch (error) {
         throw new Exception(`Failed to upload screenshot: ${error.message}`, {
            status: 500,
            code: 'E_FAILED_TO_UPLOAD_SCREENSHOT',
         })
      }
   }

   async index(ctx: HttpContext, employeeId: number, dateString: string) {
      const user = await ctx.auth.getUserOrFail()

      if (!employeeId || !dateString) {
         throw new Exception('employeeId and date are required', {
            status: 400,
            code: 'MISSING_REQUIRED_FIELDS',
         })
      }

      const date = DateTime.fromISO(dateString, { zone: 'Asia/Dhaka' })
      if (!date.isValid) {
         throw new Exception('Invalid date format. Use YYYY-MM-DD', {
            status: 400,
            code: 'INVALID_DATE_FORMAT',
         })
      }

      // Verify employee belongs to company
      const employee = await User.query()
         .where('id', employeeId)
         .where('company_id', user.companyId)
         .where('role', 'employee')
         .first()

      if (!employee) {
         throw new Exception('Employee not found', {
            status: 404,
            code: 'EMPLOYEE_NOT_FOUND',
         })
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

      return {
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
      }
   }
}
