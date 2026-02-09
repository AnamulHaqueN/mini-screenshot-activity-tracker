import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { loginThrottle } from '#start/limiter'

const AuthController = () => import('#modules/auth/auth.controller')

// Public routes
router
   .group(function AuthRoutesCb() {
      router.post('/auth/register', [AuthController, 'register'])
      router.post('/auth/login', [AuthController, 'login']).use(loginThrottle)
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
