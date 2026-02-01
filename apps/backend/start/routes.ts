/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import '#modules/auth/auth.route'

import { middleware } from './kernel.js'
import NotFoundException from '#exceptions/not_found_exception'

const ScreenshotsController = () => import('#controllers/screenshots_controller')
const EmployeesController = () => import('#controllers/employees_controller')

// Protected routes
router
   .group(() => {
      // Employee routes (owner or admin only)
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
            router.get('/screenshots/grouped', [ScreenshotsController, 'getGroupedScreenshots'])
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
   .use(
      middleware.auth({
         guards: ['jwt', 'web'],
      })
   )

router.any('*', () => {
   throw new NotFoundException()
})
