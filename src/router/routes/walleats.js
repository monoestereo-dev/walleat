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
    path: '/walleats/edit/:id',
    name: 'walleat-edit',
    component: () => import('@/views/walleats/WalleatEdit.vue'),
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
    path: '/walleats/daily-limit/:id',
    name: 'walleat-daily-limit',
    component: () => import('@/views/walleats/add-credit/AddCredit.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]
