/*
|--------------------------------------------------------------------------
| Define HTTP limiters
|--------------------------------------------------------------------------
|
| The "limiter.define" method creates an HTTP middleware to apply rate
| limits on a route or a group of routes. Feel free to define as many
| throttle middleware as needed.
|
*/

import limiter from '@adonisjs/limiter/services/main'

export const throttle = limiter.define('global', () => {
   return limiter.allowRequests(10).every('2 minute').blockFor('2 minutes')
})

export const loginThrottle = limiter.define('login', (ctx) => {
   return limiter
      .allowRequests(5)
      .every('5 minutes')
      .usingKey(`login_${ctx.request.ip()}`)
      .blockFor('5 minutes')
})

export const forgotPasswordThrottle = limiter.define('forgotPassword', (ctx) => {
   return limiter
      .allowRequests(5)
      .every('10 minutes')
      .usingKey(`forgot_password_${ctx.request.ip()}`)
      .blockFor('5 minutes')
})

export const resetPasswordThrottle = limiter.define('resetPassword', (ctx) => {
   return limiter
      .allowRequests(5)
      .every('10 minutes')
      .usingKey(`reset_password_${ctx.request.ip()}`)
      .blockFor('5 minutes')
})
