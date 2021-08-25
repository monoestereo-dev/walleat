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
    title: 'Administrar productos',
    route: 'products-list',
    icon: 'PackageIcon',
    roles: ['admin'],
  },
  {
    title: 'Productos',
    route: 'ecommerce',
    icon: 'PackageIcon',
    roles: ['admin', 'customer'],
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
    roles: ['admin', 'establishment_admin'],
  },
  {
    title: 'POS',
    route: 'selectPOS',
    icon: 'ShoppingBagIcon',
    roles: ['store_clerk'],
  },
]
