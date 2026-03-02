import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const ScreenshotsController = () => import('#modules/screenshots/screenshots.controller')

// Protected routes
router
   .group(() => {
      // Screenshots routes (owner or admin)
      router
         .group(() => {
            router.get('/screenshots/grouped', [ScreenshotsController, 'index'])
         })
         .prefix('/admin')
         .use(middleware.role(['owner', 'admin']))

      // Screenshots routes (employee)
      router
         .post('/screenshots', [ScreenshotsController, 'upload'])
         .prefix('/employee')
         .use(middleware.role(['employee']))
   })
   .prefix('/api')
   .use(
      middleware.auth({
         guards: ['jwt', 'web'],
      })
   )
