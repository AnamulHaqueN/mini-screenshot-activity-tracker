import {
   groupedScreenshotsValidator,
   uploadScreenshotValidator,
} from '#modules/screenshots/screenshot.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { ScreenshotService } from './screenshot.service.js'

@inject()
export default class ScreenshotsController {
   constructor(private screenshotService: ScreenshotService) {}

   /**
    * Upload screenshot (Employee only)
    */
   async upload(ctx: HttpContext) {
      const { screenshot } = await ctx.request.validateUsing(uploadScreenshotValidator)
      const res = await this.screenshotService.upload(ctx, screenshot)
      return ctx.response.created({
         message: 'Screenshot uploaded successfully',
         data: res,
      })
   }

   /**
    * Get screenshots grouped by hour and 10-minute intervals (Owner only)
    * This is the main view for the dashboard
    */
   async index(ctx: HttpContext) {
      const employeeId = Number(ctx.request.input('employeeId'))
      const { date: dateString } = await ctx.request.validateUsing(groupedScreenshotsValidator)
      const res = await this.screenshotService.index(ctx, employeeId, dateString)
      return ctx.response.ok(res)
   }
}
