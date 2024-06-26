import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('../views/home/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/about/AboutView.vue')
    },
    {
      path: '/games',
      name: 'games',
      // route level code-splitting
      // this generates a separate chunk (Games.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/games/GamesView.vue')
    }
  ]
})

export default router
