export default [
  {
    path: ':pathMatch(.*)*',
    name: 'page-not-found',
    component: () => import('./pages/4xx/404/Index.vue'),
    meta: {
      middleware: [],
    },
  },
  {
    path: 'access-denied',
    name: 'access-denied',
    component: () => import('./pages/4xx/403/Index.vue'),
    meta: {
      middleware: [],
    },
  },
  {
    path: 'internal-server-error',
    name: 'internal-server-error',
    component: () => import('./pages/5xx/500/Index.vue'),
    meta: {
      middleware: [],
    },
  },
]
