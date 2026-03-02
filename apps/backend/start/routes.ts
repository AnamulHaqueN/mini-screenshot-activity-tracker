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
import '#modules/email/email.route'

import NotFoundException from '#exceptions/not_found_exception'

// API Documentation routes
const DocsController = () => import('#controllers/docs_controller')
router.get('/api/docs', [DocsController, 'index'])
router.get('/api/docs/spec', [DocsController, 'spec'])

router.any('*', function NotFoundRouterHandler() {
   throw new NotFoundException()
})
