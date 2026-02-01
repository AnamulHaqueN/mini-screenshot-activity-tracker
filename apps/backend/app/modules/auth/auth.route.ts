import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const PlansController = () => import('#controllers/plans_controller')
const AuthController = () => import('./auth.controller.js')

// Public routes
router
   .group(function AuthRoutesCb() {
      router.get('/plans', [PlansController, 'index'])
      router.post('/auth/register', [AuthController, 'register'])
      router.post('/auth/login', [AuthController, 'login'])
   })
   .prefix('/api')

// Protected routes
router
   .group(() => {
      router.delete('/auth/logout', [AuthController, 'logout'])
      router.get('/auth/me', [AuthController, 'me'])
   })
   .prefix('/api')
   .use(
      middleware.auth({
         guards: ['jwt', 'web'],
      })
   )
