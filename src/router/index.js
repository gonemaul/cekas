import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/game/:mode/:level',
      name: 'game',
      component: () => import('../views/GameView.vue'),
      props: true,
    },
    // {
    //   path: '/history',
    //   name: 'history',
    //   component: () => import('../HistoryView.vue'),
    // },
  ],
})

export default router
