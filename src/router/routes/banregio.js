export default [
  {
    path: '/creditCard',
    name: 'creditCard-banregio',
    component: () => import('@/views/payment-gateway/banregio.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]
