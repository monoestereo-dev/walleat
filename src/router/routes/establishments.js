export default [
  {
    path: '/establecimientos',
    name: 'establishments-list',
    component: () => import('@/views/establishments/EstablishmentsList.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/establecimiento/:id',
    name: 'establishment-view',
    component: () => import('@/views/establishments/EstablishmentView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]
