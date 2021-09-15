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
  {
    path: '/add-store-products/:id',
    name: 'add-store-products',
    component: () => import('@/views/stores/AddStoreProducts.vue'),
    meta: {
      requiresAuth: true,
      contentClass: 'ecommerce-application',
    },
  },
  {
    path: '/add-store-products/:id/:product_id',
    name: 'add-store-product',
    component: () => import('@/views/stores/AddStoreProductToInventory.vue'),
    meta: {
      requiresAuth: true,
      contentClass: 'ecommerce-application',
    },
  },
]
