import { defineAclRules } from 'vue-simple-acl'
// import store from '../store'
import modules from './modules'
import { useAuthStore } from '../../views/pages/auth/store/auth'
import type { RoleInterface } from '@/views/pages/auth/Entities/Contracts/RoleInterface'

// const isSuperAdmin = (role: RoleInterface): boolean => role.is_super_admin === true
const isSuperAdmin = (): boolean => useAuthStore().getRole?.is_super_admin === true

// const isAdmin = ({ role: { is_admin } }) => false;
const allows = (resource: string, action: string) =>
  useAuthStore()
    .getPermissions.filter(({ resource: r }) => r === resource)
    .some(({ action: a }) => a === action)

/**
 * @param {Function} setRule
 * @param {Object} modules
 */
const registerModules = async (setRule: Function, modules: Object) => {
  for (const key in modules) {
    if (Object.hasOwnProperty.call(modules, key)) {
      const register = modules[key]
      await register(setRule, { isSuperAdmin, allows })
    }
  }
}

const rules = () =>
  defineAclRules(async (setRule) => {
    // Roles
    setRule('is-super-admin', isSuperAdmin)

    // Permissions
    await registerModules(setRule, modules)
  })

export default rules
