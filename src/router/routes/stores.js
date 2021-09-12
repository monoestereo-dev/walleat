export default [
  {
    path: '/store-products/:id',
    name: 'store-products',
    component: () => import('@/views/stores/StoreProducts.vue'),
    meta: {
      requiresAuth: true,
      contentClass: 'ecommerce-application',
      contentRenderer: 'sidebar-left-detached',
    },
  },
]
