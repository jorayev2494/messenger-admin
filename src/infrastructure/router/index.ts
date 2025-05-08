import { createRouter, createWebHistory, RouterView } from 'vue-router'
import { checkMiddleware } from './middleware'
import Tr from '@/infrastructure/translations/translation'
import routes from './routes'
// import error from '@/views/pages/error/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:locale?',
      component: RouterView,
      beforeEnter: Tr.routeMiddleware,
      children: [...routes],
    },
    // {
    //   path: '/page',
    //   name: 'index',
    //   component: () => import('@/views/layouts/error/Index.vue'),
    //   children: [...error],
    // },
  ],
})

router.beforeEach(checkMiddleware)

export default router
