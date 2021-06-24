export default [
  {
    path: '/categories/list',
    name: 'categories-list',
    component: () => import('@/views/categories/categories-list/CategoriesList.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]
