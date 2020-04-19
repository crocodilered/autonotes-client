import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

import { AUTH_APPLY } from '@/store/action-types'
import { RETURN_PATH } from '@/store/mutation-types'


Vue.use(Router)


const router = new Router({
  mode: 'history',
  
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard')
    }, 
    
    /**
     * User
     */
    
    {
      name: 'user-profile',
      path: '/logout/',
      component: () => import('@/views/users/logout'),
      meta: { authOnly: true }
    }, {
      name: 'user-login',
      path: '/login/',
      component: () => import('@/views/users/login'),
      meta: { anonymousOnly: true }
    }, {
      name: 'user-register',
      path: '/register/',
      component: () => import('@/views/users/register'),
      meta: { anonymousOnly: true }
    }, {
      name: 'user-password',
      path: '/update-password/',
      component: () => import('@/views/users/password'),
      meta: { authOnly: true }
    }, 
  
    /*
     * Notes 
     */
  
    {
      name: 'notes-list',
      path: '/notes/:kindSlug/:vehicleId(\\d+)/',
      component: () => import('@/views/notes/list'),
      meta: { authOnly: true }
    }, {
      name: 'notes-create',
      path: '/notes/:kindSlug/:vehicleId(\\d+)/create/',
      component: () => import('@/views/notes/create-update'),
      meta: { authOnly: true }
    }, {
      name: 'notes-retrieve',
      path: '/notes/:kindSlug/:vehicleId(\\d+)/:noteId(\\d+)/',
      component: () => import('@/views/notes/retrieve'),
      meta: { authOnly: true }
    }, {
      name: 'notes-update',
      path: '/notes/:kindSlug/:vehicleId(\\d+)/:noteId(\\d+)/create-update/',
      component: () => import('@/views/notes/update'),
      meta: { authOnly: true }
    }, {
      name: 'notes-delete',
      path: '/notes/:kindSlug/:vehicleId(\\d+)/:noteId(\\d+)/delete/',
      component: () => import('@/views/notes/delete'),
      meta: { authOnly: true }
    },
  
    /* 
     * Vehicles 
     */
    
    {
      name: 'vehicles-retrieve',
      path: '/vehicles/:vehicleId(\\d+)/',
      component: () => import('@/views/vehicles/retrieve'),
      meta: { authOnly: true }
    }, {
      name: 'vehicles-create',
      path: '/vehicles/create/',
      component: () => import('@/views/vehicles/create'),
      meta: { authOnly: true }
    }, {
      name: 'vehicles-update',
      path: '/vehicles/:vehicleId(\\d+)/update/',
      component: () => import('@/views/vehicles/update'),
      meta: { authOnly: true }
    }, {
      name: 'vehicles-delete',
      path: '/vehicles/:vehicleId(\\d+)/delete/',
      component: () => import('@/views/vehicles/delete'),
      meta: { authOnly: true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authOnly = to.matched.some(rec => rec.meta.authOnly)
  const anonymousOnly = to.matched.some(rec => rec.meta.anonymousOnly)

  await store.dispatch(AUTH_APPLY)

  if (store.state.auth.user ) {
    if (anonymousOnly) next('/')
  } else {
    if (authOnly) next('/login/') 
  }

  next()
})


router.saveReturnPath = () => {
  const path = router.currentRoute.fullPath
  store.commit(RETURN_PATH, path)
}


router.goReturnPath = () => {
  const href = store.state.returnPath 
    ? store.state.returnPath
    : '/'
  store.commit(RETURN_PATH, null)
  router.push(href)
}


export default router
