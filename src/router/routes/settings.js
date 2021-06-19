export default [
  {
    path: '/account-setting',
    name: 'pages-account-setting',
    component: () => import('@/views/account-setting/AccountSettingView.vue'),
    meta: {
      pageTitle: 'Account Settings',
      breadcrumb: [
        {
          text: 'Pages',
        },
        {
          text: 'Account Settings',
          active: true,
        },
      ],
    },
  },
]
