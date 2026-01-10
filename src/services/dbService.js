import db from '@/data/db.json'

export const dbService = {
  // Ambil semua materi untuk halaman LearnView
  getAllLessons: () => {
    return db.lessons
  },

  // Ambil satu materi spesifik berdasarkan ID
  getLessonById: (id) => {
    return db.lessons.find((lesson) => lesson.id === id)
  },

  // Ambil konfigurasi game berdasarkan ID materi
  getGameConfigByLessonId: (id) => {
    const lesson = db.lessons.find((l) => l.id === id)
    return lesson ? lesson.config : null
  },
}
