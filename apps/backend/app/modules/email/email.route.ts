import router from '@adonisjs/core/services/router'

import TestEmailController from '#modules/email/email.controller'

router.get('/verify-email', [TestEmailController, 'verify'])
