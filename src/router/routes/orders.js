export default [
  // {
  //   path: '/orders',
  //   name: 'orders-list',
  //   component: () => import('@/views/HomeCustomer.vue'),
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
  {
    path: '/order/:id',
    name: 'order-view',
    component: () => import('@/views/orders/OrderView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]
