export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeCustomer.vue'),
    meta: {
      breadcrumb: [
        {
          text: 'Home',
          active: true,
        },
      ],
    },
  },
  {
    path: '/second-page',
    name: 'second-page',
    component: () => import('@/views/SecondPage.vue'),
    meta: {
      breadcrumb: [
        {
          text: 'Second Page',
          active: true,
        },
      ],
    },
  },
]
