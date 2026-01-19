import vine from '@vinejs/vine'

export const uploadScreenshotValidator = vine.compile(
  vine.object({
    screenshot: vine.file({
      size: '10mb',
      extnames: ['jpg', 'jpeg', 'png'],
    }),
    // captureTime: vine.date(),
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
