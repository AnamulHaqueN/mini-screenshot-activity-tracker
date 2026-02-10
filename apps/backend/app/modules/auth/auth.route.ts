import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { forgotPasswordThrottle, loginThrottle, resetPasswordThrottle } from '#start/limiter'

const AuthController = () => import('#modules/auth/auth.controller')

// Public routes
router
   .group(function AuthRoutesCb() {
      router.post('/auth/register', [AuthController, 'register'])
      router.post('/auth/login', [AuthController, 'login']).use(loginThrottle)
      router
         .post('/auth/forgot-password', [AuthController, 'forgotPassword'])
         .use(forgotPasswordThrottle)
      router
         .post('/auth/reset-password', [AuthController, 'resetPassword'])
         .use(resetPasswordThrottle)
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
