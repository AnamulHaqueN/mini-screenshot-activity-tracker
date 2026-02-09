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
   return limiter.allowRequests(10).every('1 minute')
})

export const loginThrottle = limiter.define('login', (ctx) => {
   return limiter
      .allowRequests(5)
      .every('1 minutes')
      .usingKey(`login_${ctx.request.ip()}`)
      .blockFor('2 minutes')
})
