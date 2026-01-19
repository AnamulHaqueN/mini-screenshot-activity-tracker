/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ScreenshotsController = () => import('#controllers/screenshots_controller')
const EmployeesController = () => import('#controllers/employees_controller')
const PlansController = () => import('#controllers/plans_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Public routes
router.get('/plans', [PlansController, 'index'])
router.post('/auth/register', [AuthController, 'registerCompany'])
router.post('/auth/login', [AuthController, 'login'])

// Protected routes
router
  .group(() => {
    // Auth routes
    router.delete('/auth/logout', [AuthController, 'logout'])
    router.get('/auth/me', [AuthController, 'me'])

    // Employee routes (owner only)
    router
      .group(() => {
        router.get('/employees', [EmployeesController, 'index'])
        router.post('/employees', [EmployeesController, 'store'])
        router.get('/employees/search', [EmployeesController, 'search'])
        router.get('/employees/:id', [EmployeesController, 'show'])
        router.put('/employees/:id', [EmployeesController, 'update'])
        router.delete('/employees/:id', [EmployeesController, 'destroy'])
      })
      .use(middleware.role(['owner']))

    // Screenshot routes
    router
      .post('/screenshots', [ScreenshotsController, 'upload'])
      .use(middleware.role(['employee']))

    router
      .group(() => {
        router.get('/screenshots', [ScreenshotsController, 'index'])
        router.get('/screenshots/grouped', [ScreenshotsController, 'grouped'])
        router.get('/screenshots/grouped/all', [ScreenshotsController, 'groupedAll'])
      })
      .use(middleware.role(['owner']))
  })
  .use(middleware.auth())
