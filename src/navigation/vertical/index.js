export default [
  {
    title: 'Home',
    route: 'home',
    icon: 'HomeIcon',
    roles: ['admin', 'customer'],
  },
  {
    title: 'Walleat Pay',
    route: 'walleat-pay',
    icon: 'CpuIcon',
    roles: ['admin', 'customer'],
  },
  {
    title: 'Usuarios',
    route: 'apps-users-list',
    icon: 'UserIcon',
    roles: ['admin'],
  },
  {
    title: 'Categorías',
    route: 'categories-list',
    icon: 'BookmarkIcon',
    roles: ['admin'],
  },
  {
    title: 'Productos',
    icon: 'PackageIcon',
    roles: ['admin'],
    children: [
      {
        title: 'Lista',
        route: 'ecommerce',
        roles: ['admin'],
      },
      {
        title: 'Administrar',
        route: 'products-list',
        roles: ['admin'],
      },
    ],
  },
  {
    title: 'Productos',
    route: 'ecommerce',
    icon: 'PackageIcon',
    roles: ['customer'],
  },
  {
    title: 'Walleats',
    route: 'walleats-list',
    icon: 'DollarSignIcon',
    roles: ['admin', 'customer'],
  },
  {
    title: 'Establecimientos',
    route: 'establishments-list',
    icon: 'ShoppingBagIcon',
    roles: ['admin'],
  },
  {
    title: 'POS',
    route: 'selectPOS',
    icon: 'ShoppingBagIcon',
    roles: ['store_clerk'],
  },
  {
    title: 'Ventas',
    route: 'select-store',
    icon: 'ShoppingCartIcon',
    roles: ['store_clerk'],
  },
]
