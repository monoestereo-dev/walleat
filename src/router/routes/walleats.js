export default [
  {
    path: '/walleats/list',
    name: 'walleats-list',
    component: () => import('@/views/walleats/WalleatsList.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/walleats/view/:id',
    name: 'walleat-view',
    component: () => import('@/views/walleats/WalleatView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/walleats/add-credit/',
    name: 'walleat-add-credit',
    component: () => import('@/views/walleats/add-credit/AddCredit.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/walleats/new',
    name: 'walleat-new',
    component: () => import('@/views/walleats/walleat-new/WalleatNew.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]
