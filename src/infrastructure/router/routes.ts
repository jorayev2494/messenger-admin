import auth from '@/views/pages/auth/routes/index'
import dashboard from '@/views/pages/dashboard/routes'
import manager from '@/views/pages/manager/routes/index'
import profile from '@/views/pages/profile/routes/index'
import client from '@/views/pages/client/routes/index'
import role from '@/views/pages/role/routes/index'
import centrifuge from '@/views/pages/centrifuge/routes/index'
import error from '@/views/pages/error/routes'

export default [
  ...auth,
  {
    path: '',
    name: 'index',
    redirect: { name: 'dashboard' },
    component: () => import('@/views/layouts/dashboard/Index.vue'),
    children: [...dashboard, ...manager, ...profile, ...client, ...role, ...centrifuge],
  },
  // {
  //   path: '',
  //   name: 'index',
  //   redirect: { name: 'dashboard' },
  //   component: () => import('@/views/layouts/error/Index.vue'),
  //   children: [...error],
  // },
  ...error,
]
