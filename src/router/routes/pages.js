export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/walleat-pay',
    name: 'walleat-pay',
    component: () => import('@/views/SecondPage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]
