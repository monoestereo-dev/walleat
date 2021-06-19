export default [
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/miscellaneous/Error404.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/coming-soon',
    name: 'misc-coming-soon',
    component: () => import('@/views/miscellaneous/ComingSoon.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/not-authorized',
    name: 'misc-not-authorized',
    component: () => import('@/views/miscellaneous/NotAuthorized.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },
  {
    path: '/under-maintenance',
    name: 'misc-under-maintenance',
    component: () => import('@/views/miscellaneous/UnderMaintenance.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/error',
    name: 'misc-error',
    component: () => import('@/views/miscellaneous/Error.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/faq',
    name: 'pages-faq',
    component: () => import('@/views/faq/Faq.vue'),
    meta: {
      pageTitle: 'FAQ',
      breadcrumb: [
        {
          text: 'Pages',
        },
        {
          text: 'FAQ',
          active: true,
        },
      ],
    },
  },
  {
    path: '/knowledge-base',
    name: 'pages-knowledge-base',
    component: () => import('@/views/Knowledge-base/KnowledgeBase.vue'),
    meta: {
      pageTitle: 'Knowledge Base',
      breadcrumb: [
        {
          text: 'Pages',
        },
        {
          text: 'Knowledge Base',
          active: true,
        },
      ],
    },
  },
  {
    path: '/knowledge-base/:category',
    name: 'pages-knowledge-base-category',
    component: () => import('@/views/Knowledge-base/KnowledgeBaseCategory.vue'),
    meta: {
      pageTitle: 'Category',
      breadcrumb: [
        {
          text: 'Pages',
        },
        {
          text: 'Knowledge Base',
          to: '/Knowledge-base',
        },
        {
          text: 'Category',
          active: true,
        },
      ],
      navActiveLink: 'pages-knowledge-base',
    },
  },
  {
    path: '/knowledge-base/:category/:slug',
    name: 'pages-knowledge-base-question',
    component: () => import('@/views/Knowledge-base/KnowledgeBaseCategoryQuestion.vue'),
    meta: {
      pageTitle: 'Question',
      breadcrumb: [
        {
          text: 'Pages',
        },
        {
          text: 'Knowledge Base',
          to: '/Knowledge-base',
        },
        {
          text: 'Category',
          to: '/Knowledge-base/category',
        },
        {
          text: 'Question',
          active: true,
        },
      ],
      navActiveLink: 'pages-knowledge-base',
    },
  },
]
