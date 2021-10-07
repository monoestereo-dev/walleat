export default [
  {
    path: '/POS/:store_id',
    name: 'POS',
    component: () => import('@/views/e-commerce/e-commerce-checkout/Pos.vue'),
    meta: {
      requiresAuth: true,
      contentClass: 'ecommerce-application',
    },
  },
  {
    path: '/selectPOS',
    name: 'selectPOS',
    component: () => import('@/views/e-commerce/e-commerce-checkout/SelectPOS.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]
