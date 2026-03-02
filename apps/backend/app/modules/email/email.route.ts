import router from '@adonisjs/core/services/router'

const TestEmailController = () => import('#modules/email/email.controller')

router.get('/verify-email', [TestEmailController, 'verify'])
