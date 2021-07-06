export default [
  {
    path: '/account-setting',
    name: 'pages-account-setting',
    component: () => import('@/views/account-setting/AccountSettingView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]
