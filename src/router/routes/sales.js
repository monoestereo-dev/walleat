export default [
  {
    path: '/selectStore',
    name: 'select-store',
    component: () => import('@/views/sales/SelectStore.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/sales/:id',
    name: 'sales-view',
    component: () => import('@/views/sales/SalesReport.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]
