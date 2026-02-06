import vine from '@vinejs/vine'

export const planValidator = vine.compile(
   vine.object({
      name: vine.string(),
      description: vine.string().optional(),
      price: vine.number(),
      period: vine.string().optional(),
      note: vine.string().optional(),
      features: vine.array(vine.string()).optional(),
      highlight: vine.boolean().optional(),
   })
)
