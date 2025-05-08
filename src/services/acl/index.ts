import { createAcl } from 'vue-simple-acl'
import router from '../../infrastructure/router/index'
import { useAuthStore } from '../../views/pages/auth/store/auth'
import rules from './rules'

const simpleAcl = createAcl({
  // user: (): boolean => useAuthStore().getRole?.is_super_admin === true, // short for user: user
  rules, // short for rules: rules
  router, // OPTIONAL, short for router: router
  // other optional vue-simple-acl options here... See Vue Simple ACL Options below
})

export default simpleAcl
