/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AuthController = () => import('#controllers/auth_controller')
const ScreenshotsController = () => import('#controllers/screenshots_controller')
const EmployeesController = () => import('#controllers/employees_controller')
const PlansController = () => import('#controllers/plans_controller')

// Public routes
router
  .group(() => {
    router.get('/plans', [PlansController, 'index'])
    router.post('/auth/register', [AuthController, 'registerCompany'])
    router.post('/auth/login', [AuthController, 'login'])
  })
  .prefix('/api')

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

        // Screenshots routes (owner or admin)
        router.get('/screenshots', [ScreenshotsController, 'index'])
        router.get('/screenshots/grouped', [ScreenshotsController, 'grouped'])
        router.get('/screenshots/grouped/all', [ScreenshotsController, 'groupedAll'])
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
  .use(middleware.auth())
