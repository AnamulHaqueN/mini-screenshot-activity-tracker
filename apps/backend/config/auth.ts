import { defineConfig } from '@adonisjs/auth'
import { sessionUserProvider } from '@adonisjs/auth/session'
import { JwtGuard } from '../app/auth/guards/jwt_guard.js'
import env from '#start/env'

// import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens'
import type { InferAuthenticators, InferAuthEvents, Authenticators } from '@adonisjs/auth/types'

// const authConfig = defineConfig({
//   default: 'api',
//   guards: {
//     api: tokensGuard({
//       provider: tokensUserProvider({
//         tokens: 'accessTokens',
//         model: () => import('#models/user')
//       }),
//     }),
//   },
// })

const jwtConfig = {
  secret: env.get('APP_KEY'),
}
const userProvider = sessionUserProvider({
  model: () => import('#models/user'),
})

const authConfig = defineConfig({
  default: 'jwt',
  guards: {
    jwt: (ctx) => {
      return new JwtGuard(ctx, userProvider, jwtConfig)
    },
  },
})

export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  export interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
