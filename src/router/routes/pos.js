export default [
  {
    path: '/POS/:store_id',
    name: 'POS',
    component: () => import('@/views/e-commerce/e-commerce-checkout/ECommerceCheckout.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]
