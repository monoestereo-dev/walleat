export default [
  {
    path: '/products/list',
    name: 'products-list',
    component: () => import('@/views/products/products-list/ProductsList.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/products',
    name: 'ecommerce',
    component: () => import('@/views/e-commerce/e-commerce-shop/ECommerceShop.vue'),
    meta: {
      requiresAuth: true,
      contentRenderer: 'sidebar-left-detached',
      contentClass: 'ecommerce-application',
    },
  },
  {
    path: '/products/view/:id',
    name: 'product-view',
    component: () => import('@/views/products/product-view/ProductView.vue'),
    meta: {
      requiresAuth: true,
      breadcrumb: [
        {
          text: 'Productos',
          to: { name: 'ecommerce' },
        },
      ],
    },
  },
  {
    path: '/products/ban/:id',
    name: 'ban-products',
    component: () => import('@/views/e-commerce/e-commerce-shop/ECommerceShop.vue'),
    meta: {
      requiresAuth: true,
      contentRenderer: 'sidebar-left-detached',
      contentClass: 'ecommerce-application',
    },
  },
  {
    path: '/products/edit/:id',
    name: 'product-edit',
    component: () => import('@/views/products/product-edit/ProductEdit.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]
