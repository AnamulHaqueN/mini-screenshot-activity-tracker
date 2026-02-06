import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const PlansController = () => import('#modules/plans/plans.controller')

// Public routes
router
   .group(() => {
      router.get('/plans', [PlansController, 'index'])
      router
         .post('/plans', [PlansController, 'store'])
         .use(
            middleware.auth({
               guards: ['jwt', 'web'],
            })
         )
         .use(middleware.plan('super-admin@ezystaff.com'))
   })
   .prefix('/api')
