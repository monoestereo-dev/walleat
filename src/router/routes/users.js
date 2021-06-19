export default [
  {
    path: '/users/list',
    name: 'apps-users-list',
    component: () => import('@/views/user/users-list/UsersList.vue'),
  },
  {
    path: '/users/view/:id',
    name: 'apps-users-view',
    component: () => import('@/views/user/users-view/UsersView.vue'),
  },
  {
    path: '/users/edit/:id',
    name: 'apps-users-edit',
    component: () => import('@/views/user/users-edit/UsersEdit.vue'),
  },
  {
    path: '/profile',
    name: 'pages-profile',
    component: () => import('@/views/profile/Profile.vue'),
    meta: {
      pageTitle: 'Profile',
      breadcrumb: [
        {
          text: 'Pages',
        },
        {
          text: 'Profile',
          active: true,
        },
      ],
    },
  },
]
