import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import HistoryView from '../views/HistoryView.vue'
import LearnView from '@/views/LearnView.vue'
import LessonDetailView from '@/views/LessonDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/learn',
      name: 'learn',
      component: LearnView,
    },
    {
      path: '/learn/:id',
      name: 'lesson-detail',
      component: LessonDetailView,
    },
    {
      path: '/game/:mode/:level',
      name: 'game',
      component: GameView,
      props: true,
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView,
    },
  ],
})

export default router
