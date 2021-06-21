export default [
  {
    path: '/products/list',
    name: 'products-list',
    component: () => import('@/views/products/products-list/ProductsList.vue'),
  },
  {
    path: '/products/view/:id',
    name: 'product-view',
    component: () => import('@/views/products/product-view/ProductView.vue'),
  },
  {
    path: '/products/edit/:id',
    name: 'product-edit',
    component: () => import('@/views/products/product-edit/ProductEdit.vue'),
  },
]
