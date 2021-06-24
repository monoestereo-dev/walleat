export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeCustomer.vue'),
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          text: 'Home',
          active: true,
        },
      ],
    },
  },
  {
    path: '/walleat-pay',
    name: 'walleat-pay',
    component: () => import('@/views/SecondPage.vue'),
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          text: 'Second Page',
          active: true,
        },
      ],
    },
  },
]
