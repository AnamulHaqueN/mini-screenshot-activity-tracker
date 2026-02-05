import Plan from '#models/plan'
import User from '#models/user'
import { RegisterType } from './auth.type.js'
import Company from '#models/company'

export class AuthService {
   async register(data: RegisterType) {
      const plan = await Plan.findOrFail(data.planId)

      const company = await Company.create({
         name: data.companyName,
         planId: plan.id,
      })

      // Create owner or admin
      const user = await User.create({
         name: data.ownerName,
         email: data.ownerEmail,
         password: data.password,
         companyId: company.id,
         role: 'admin',
      })

      /**
       * Ignore access token creation in the time of registration
       * Token will be generated in login time
       */
      //  const token = await User.accessTokens.create(owner, ['*'], { expiresIn: '7 days' })

      return {
         message: 'Company registered successfully',
         data: {
            company: {
               id: company.id,
               name: company.name,
               planId: company.planId,
            },
            owner: {
               id: user.id,
               name: user.name,
               email: user.email,
               role: user.role,
            },
            // token: token.value!.release(),
         },
      }
   }
}
