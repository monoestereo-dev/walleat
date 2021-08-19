import Vue from 'vue'
import VueRouter from 'vue-router'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
// import { canNavigate } from '@/libs/acl/routeProtection'
import jwt from 'jsonwebtoken'

// Routes
import pages from './routes/pages'
import auth from './routes/auth'
import miscellaneous from './routes/miscellaneous'
import settings from './routes/settings'
import users from './routes/users'
import categories from './routes/categories'
import products from './routes/products'
import walleats from './routes/walleats'
import orders from './routes/orders'
import establishments from './routes/establishments'
import paymentGateway from './routes/payment-gateway'
import pos from './routes/pos'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'home' } },

    ...pages,
    ...auth,
    ...miscellaneous,
    ...settings,
    ...users,
    ...categories,
    ...products,
    ...walleats,
    ...orders,
    ...establishments,
    ...paymentGateway,
    ...pos,

    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const userData = getUserData()
  const isLoggedIn = isUserLoggedIn()

  if (to.meta.requiresAuth) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'auth-login' })
  }

  // TODO: Mandar a vista de token expired no login.
  if (isLoggedIn) {
    // const decodedToken = jwt.decode('eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjU0MjU3NzIsInN1YiI6ImU3NjUyNTYyLTNlMGUtNGU0ZC1iNjlmLTM1ZDI4M2MzNGEwYSJ9.bM5UTr8TbSihHlRvRlvW-_9cm25VFWv6knzspwL5x78')
    const decodedToken = jwt.decode(userData.token)
    if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
      /* Remove userData from localStorage */
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userData')
      return next({ name: 'auth-login' })
    }
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    next(getHomeRouteForLoggedInUser(userData ? userData.role_name : null))
  }

  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
