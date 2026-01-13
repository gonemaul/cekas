// src/services/questionGenerator.js
import { dbService } from '@/services/dbService'

// Memori untuk mencegah soal berulang (Bug 4 & 5)
let lastQuestions = []
/**
 * METHOD 1: Pintu Utama (Orchestrator)
 * Menentukan apakah menggunakan logika kurikulum atau gameplay normal
 */
export const generateQuestionLogic = (mode, level, methodId = null) => {
  let question = null
  let attempts = 0

  while (attempts < 15) {
    if (methodId) {
      const lesson = dbService.getLessonById(methodId)
      question = lesson ? generateMethodQuestion(lesson) : generateNormalQuestion(mode, level)
    } else {
      question = generateNormalQuestion(mode, level)
    }

    // Masalah 2: Cek Duplikasi Visual (ID Unik)
    const isDuplicate = lastQuestions.some((q) => q.id === question.id)
    if (!isDuplicate) break
    attempts++
  }

  // Simpan history soal
  lastQuestions.push(question)
  if (lastQuestions.length > 5) lastQuestions.shift()

  return question
}

/**
 * METHOD 2: METHOD-BASED (Berdasarkan Kurikulum/Learn)
 */
const generateMethodQuestion = (lesson) => {
  const { id, config } = lesson
  const { range, mode } = config

  /**
   * Kamus Trik Khusus (Special Tricks Factory)
   * Tempat menyimpan rumus-rumus unik untuk materi tertentu.
   * Setiap fungsi menerima parameter 'r' (range) dari DB.
   */
  const specialTricks = {
    // Materi: Perkalian angka belasan (11-19)
    'perkalian-belasan': (r) => {
      const a = Math.floor(Math.random() * (19 - 11 + 1)) + 11
      const b = Math.floor(Math.random() * (19 - 11 + 1)) + 11
      return { display: `${a} × ${b}`, answer: a * b }
    },

    // Materi: Trik perkalian angka dengan akhiran 5 yang sama (kuadrat)
    'kuadrat-akhiran-lima': (r) => {
      // r.min/max bisa diset di DB untuk menentukan digit (misal 15, 25, dst)
      const base = (Math.floor(Math.random() * 9) + 1) * 10 + 5
      return { display: `${base} × ${base}`, answer: base * base }
    },

    // Materi: Trik menjumlahkan angka yang mendekati 100
    'pembulatan-seratus': (r) => {
      const a = Math.floor(Math.random() * 50) + 100 // 100-150
      const b = 99 // Angka yang memicu trik pembulatan
      return { display: `${a} + ${b}`, answer: a + b }
    },

    // Materi: Perkalian 11 magic
    'trik-perkalian-11': (r) => {
      const a = Math.floor(Math.random() * (r.max - r.min + 1)) + r.min
      return { display: `${a} × 11`, answer: a * 11 }
    },
  }

  /**
   * EKSEKUSI:
   * 1. Cek apakah ada trik khusus berdasarkan ID materi.
   */
  if (specialTricks[id]) {
    return specialTricks[id](range)
  }

  /**
   * 2. FALLBACK:
   * Jika tidak ada trik khusus (misal materi penjumlahan biasa),
   * gunakan generateNormalQuestion dengan range yang ditarik dari DB.
   */
  return generateNormalQuestionByRange(mode, range)
}

/**
 * HELPER: Modifikasi generateNormalQuestion agar menerima range custom
 * Ini agar kita bisa menggunakan logic KABATAKU yang sudah aman dari bug.
 */
const generateNormalQuestionByRange = (mode, range) => {
  // Logic sama dengan generateNormalQuestion, tapi min & max
  // diambil langsung dari objek 'range' di db.json
  const min = range.min || 1
  const max = range.max || 100

  // Panggil logic internal yang sudah kita perbaiki di Method 3
  // (Pastikan method 3 bisa menerima parameter range objek)
  return generateNormalQuestion(mode, range)
}

/**
 * METHOD 3: NORMAL ENGINE (Gameplay Utama + Anti-Bug)
 */
const generateNormalQuestion = (mode, level, customRange = null) => {
  let finalAnswer = null
  let displayStr = ''
  let questionId = ''
  let safetyCounter = 0

  const getOp = () => {
    const activeMode =
      mode === 'random'
        ? ['addition', 'subtraction', 'multiplication', 'division'][Math.floor(Math.random() * 4)]
        : mode
    const symbols = { addition: '+', subtraction: '-', multiplication: '×', division: '÷' }
    return { name: activeMode, symbol: symbols[activeMode] }
  }

  while (finalAnswer === null && safetyCounter < 20) {
    safetyCounter++

    if (level === 'berantai') {
      // Masalah 3: UI Overflow (Batasi jumlah angka di level tinggi)
      const count = mode === 'random' ? 3 : 4
      let nums = []
      let ops = []

      for (let i = 0; i < count; i++) {
        // Masalah 1: Angka Terlalu Mudah (Hindari 0 dan 1 di operasi tertentu)
        let n = Math.floor(Math.random() * 9) + 1
        nums.push(n)
        if (i < count - 1) ops.push(getOp())
      }

      finalAnswer = calculateKabataku(nums, ops)
      if (finalAnswer !== null) {
        displayStr = nums.map((n, i) => (i === 0 ? `${n}` : `${ops[i - 1].symbol} ${n}`)).join(' ')
        questionId = nums.join('') + ops.map((o) => o.symbol).join('')
      }
    } else {
      // Logic Dua Angka (Satuan/Puluhan/Ratusan)
      let min = customRange?.min || (level === 'puluhan' ? 10 : level === 'ratusan' ? 100 : 1)
      let max = customRange?.max || (level === 'puluhan' ? 99 : level === 'ratusan' ? 999 : 9)

      let a = Math.floor(Math.random() * (max - min + 1)) + min
      let b = Math.floor(Math.random() * (max - min + 1)) + min
      const op = getOp()

      // Masalah 1: Hindari angka 1 pada perkalian/pembagian agar menantang
      if ((op.name === 'multiplication' || op.name === 'division') && b === 1) b = 2

      if (op.name === 'addition') {
        finalAnswer = a + b
        questionId = [a, b].sort().join('') + '+' // Masalah 2: Mirror ID
      } else if (op.name === 'subtraction') {
        if (a < b) [a, b] = [b, a] // Fix Negatif
        finalAnswer = a - b
        questionId = `${a}-${b}`
      } else if (op.name === 'multiplication') {
        if (level !== 'satuan') b = Math.floor(Math.random() * 8) + 2
        finalAnswer = a * b
        questionId = [a, b].sort().join('') + 'x'
      } else {
        const temp = a
        a = a * b
        finalAnswer = temp // Fix Koma
        questionId = `${a}/${b}`
      }
      displayStr = `${a} ${op.symbol} ${b}`
    }
  }

  return { display: displayStr, answer: finalAnswer || 0, id: questionId }
}

/**
 * HELPER: ANTI-BUG KABATAKU
 */
const calculateKabataku = (nums, ops) => {
  let tNums = [nums[0]],
    tOps = []

  // Tahap 1: Kali & Bagi (Fix Koma & Nol)
  for (let i = 0; i < ops.length; i++) {
    const n = nums[i + 1],
      op = ops[i]
    if (op.symbol === '×') {
      tNums[tNums.length - 1] *= n
    } else if (op.symbol === '÷') {
      if (n === 0 || tNums[tNums.length - 1] % n !== 0) return null
      tNums[tNums.length - 1] /= n
    } else {
      tNums.push(n)
      tOps.push(op)
    }
  }

  // Tahap 2: Tambah & Kurang (Fix Negatif)
  let res = tNums[0]
  for (let i = 0; i < tOps.length; i++) {
    if (tOps[i].symbol === '+') res += tNums[i + 1]
    else {
      res -= tNums[i + 1]
      if (res < 0) return null
    }
  }
  return res
}
