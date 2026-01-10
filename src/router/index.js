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
router.afterEach((to) => {
  const baseTitle = 'Cekas'
  const slogan = 'Tangkas Berhitung'

  // Logika penentuan judul berdasarkan nama rute
  switch (to.name) {
    case 'game':
      document.title = `Sedang Bermain... | ${baseTitle}`
      break
    case 'learn':
      document.title = `Kurikulum Metode | ${baseTitle}`
      break
    case 'lesson-detail':
      // Jika ingin lebih detail, judul bisa diambil dari parameter atau state
      document.title = `Belajar Teknik | ${baseTitle}`
      break
    case 'history':
      document.title = `Riwayat Skor | ${baseTitle}`
      break
    case 'home':
      document.title = `${baseTitle} — ${slogan}`
      break
    default:
      document.title = baseTitle
  }
  if (to.name === 'lesson-detail' && to.params.id) {
    // Mengubah kebab-case menjadi Capitalized Words
    const lessonName = to.params.id
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    document.title = `${lessonName} | ${baseTitle}`
    return // Keluar dari fungsi agar tidak tertimpa switch di atas
  }
})

export default router
