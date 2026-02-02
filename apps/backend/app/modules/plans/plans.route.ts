import router from '@adonisjs/core/services/router'

const PlansController = () => import('#modules/plans/plans.controller')

// Public routes
router
   .group(() => {
      router.get('/plans', [PlansController, 'index'])
   })
   .prefix('/api')
