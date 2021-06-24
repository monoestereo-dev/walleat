import Vue from 'vue'
import VueRouter from 'vue-router'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
// import { canNavigate } from '@/libs/acl/routeProtection'

// Routes
import pages from './routes/pages'
import auth from './routes/auth'
import miscellaneous from './routes/miscellaneous'
import settings from './routes/settings'
import users from './routes/users'
import categories from './routes/categories'
import products from './routes/products'
import walleats from './routes/walleats'

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

    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()
  if (to.meta.requiresAuth) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'auth-login' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
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
