export default [
  {
    path: '/choose-payment-gateway',
    name: 'choose-payment-gateway',
    component: () => import('@/views/payment-gateway/ChoosePaymentGateway.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/creditCard',
    name: 'creditCard-banregio',
    component: () => import('@/views/payment-gateway/banregio.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]
