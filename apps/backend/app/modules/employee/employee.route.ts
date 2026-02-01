import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const EmployeeController = () => import('#modules/employee/employee.controller')

// Employee routes (owner or admin only)
router
   .group(() => {
      router.get('/employees', [EmployeeController, 'index'])
      router.post('/employees', [EmployeeController, 'store'])
      router.get('/employees/search', [EmployeeController, 'search'])
      router.get('/employees/:id', [EmployeeController, 'show'])
      router.put('/employees/:id', [EmployeeController, 'update'])
      router.delete('/employees/:id', [EmployeeController, 'destroy'])
   })
   .prefix('/api/admin')
   .use(
      middleware.auth({
         guards: ['jwt', 'web'],
      })
   )
   .use(middleware.role(['owner', 'admin']))
