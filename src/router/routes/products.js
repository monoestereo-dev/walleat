export default [
  {
    path: '/products/list',
    name: 'products-list',
    component: () => import('@/views/products/products-list/ProductsList.vue'),
  },
  {
    path: '/apps/e-commerce/shop',
    name: 'ecommerce',
    component: () => import('@/views/e-commerce/e-commerce-shop/ECommerceShop.vue'),
    meta: {
      contentRenderer: 'sidebar-left-detached',
      contentClass: 'ecommerce-application',
      pageTitle: 'Shop',
      breadcrumb: [
        {
          text: 'Productos',
          active: true,
        },
      ],
    },
  },
  {
    path: '/products/view/:id',
    name: 'product-view',
    component: () => import('@/views/products/product-view/ProductView.vue'),
    breadcrumb: [
      {
        text: 'Productos',
      },
      {
        text: 'xxx',
        active: true,
      },
    ],
  },
  {
    path: '/products/edit/:id',
    name: 'product-edit',
    component: () => import('@/views/products/product-edit/ProductEdit.vue'),
  },
]
