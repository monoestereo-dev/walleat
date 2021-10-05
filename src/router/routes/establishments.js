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
  {
    path: '/nuevo-establecimiento',
    name: 'new-establishment',
    component: () => import('@/views/establishments/EstablishmentNew.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]
