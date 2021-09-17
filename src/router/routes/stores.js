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
  {
    path: '/edit-store-product/:store_id/:store_product_id/:product_id/:unit_cost/:unit_price',
    name: 'edit-store-product',
    component: () => import('@/views/stores/EditStoreProduct.vue'),
    meta: {
      requiresAuth: true,
      contentClass: 'ecommerce-application',
    },
  },
  {
    path: '/store-users/:id',
    name: 'store-users',
    component: () => import('@/views/stores/StoreUsers.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/new-store-product/:id',
    name: 'new-store-product',
    component: () => import('@/views/stores/NewStoreProduct.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]
