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
import '#modules/employee/employee.route'
import '#modules/plans/plans.route'
import '#modules/screenshots/screenshots.route'

import NotFoundException from '#exceptions/not_found_exception'

router.any('*', function NotFoundRouterHandler() {
   throw new NotFoundException()
})
