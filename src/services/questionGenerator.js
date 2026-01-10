// src/services/questionGenerator.js

export const generateQuestionLogic = (mode, level, methodId = null) => {
  let finalAnswer = 0
  let displayStr = ''

  // --- A. LOGIKA KHUSUS MATERI (DARI KURIKULUM) ---
  if (methodId) {
    switch (methodId) {
      case 'trik-perkalian-11': {
        let a = Math.floor(Math.random() * 89) + 10
        displayStr = `${a} × 11`
        finalAnswer = a * 11
        break
      }
      case 'pembulatan-sembilan': {
        let a = Math.floor(Math.random() * 80) + 10
        let b = (Math.floor(Math.random() * 5) + 1) * 10 + 9
        displayStr = `${a} + ${b}`
        finalAnswer = a + b
        break
      }
      case 'kuadrat-akhiran-lima': {
        let n = (Math.floor(Math.random() * 9) + 1) * 10 + 5
        displayStr = `${n} × ${n}`
        finalAnswer = n * n
        break
      }
      case 'perkalian-sembilan-jari': {
        let a = Math.floor(Math.random() * 9) + 1
        displayStr = `${a} × 9`
        finalAnswer = a * 9
        break
      }
      case 'perkalian-dua-puluh-lima': {
        let a = (Math.floor(Math.random() * 10) + 1) * 4
        displayStr = `${a} × 25`
        finalAnswer = a * 25
        break
      }
      case 'pembagian-lima-magic': {
        let a = (Math.floor(Math.random() * 20) + 1) * 5
        displayStr = `${a} ÷ 5`
        finalAnswer = a / 5
        break
      }
      case 'estimasi-pembagian': {
        let a = (Math.floor(Math.random() * 9) + 1) * 100
        let b = (Math.floor(Math.random() * 2) + 1) * 100
        displayStr = `${a} ÷ ${b}`
        finalAnswer = a / b
        break
      }
      default:
        return generateNormalQuestion(mode, level)
    }
    return { display: displayStr, answer: finalAnswer }
  }

  // --- B. LOGIKA MODE BEBAS (NORMAL) ---
  return generateNormalQuestion(mode, level)
}

// Fungsi internal untuk logika normal (pindahan kode asli kamu)
const generateNormalQuestion = (mode, level) => {
  let finalAnswer = 0
  let displayStr = ''

  // Helper untuk ambil operator
  const getOpSymbol = () => {
    const activeMode =
      mode === 'random'
        ? ['addition', 'subtraction', 'multiplication', 'division'][Math.floor(Math.random() * 4)]
        : mode
    const symbols = { addition: '+', subtraction: '-', multiplication: '×', division: '÷' }
    return { name: activeMode, symbol: symbols[activeMode] }
  }

  if (level === 'berantai') {
    const count = Math.floor(Math.random() * 3) + 3
    let currentVal = Math.floor(Math.random() * 9) + 1
    finalAnswer = currentVal
    displayStr = currentVal.toString()

    for (let i = 1; i < count; i++) {
      const nextVal = Math.floor(Math.random() * 9) + 1
      const op = getOpSymbol()
      if (op.name === 'addition') finalAnswer += nextVal
      else if (op.name === 'subtraction') {
        if (finalAnswer - nextVal < 0) {
          finalAnswer += nextVal
          displayStr += ` + ${nextVal}`
          continue
        }
        finalAnswer -= nextVal
      } else if (op.name === 'multiplication') finalAnswer *= nextVal
      else {
        if (finalAnswer % nextVal === 0 && finalAnswer !== 0) finalAnswer /= nextVal
        else {
          finalAnswer += nextVal
          displayStr += ` + ${nextVal}`
          continue
        }
      }
      displayStr += ` ${op.symbol} ${nextVal}`
    }
  } else {
    let min = 1,
      max = 9
    if (level === 'puluhan') {
      min = 10
      max = 99
    }
    if (level === 'ratusan') {
      min = 100
      max = 999
    }

    let a = Math.floor(Math.random() * (max - min + 1)) + min
    let b = Math.floor(Math.random() * (max - min + 1)) + min
    const op = getOpSymbol()

    if (op.name === 'addition') finalAnswer = a + b
    else if (op.name === 'subtraction') {
      if (a < b) [a, b] = [b, a]
      finalAnswer = a - b
    } else if (op.name === 'multiplication') {
      if (level !== 'satuan') b = Math.floor(Math.random() * 10) + 1
      finalAnswer = a * b
    } else {
      finalAnswer = a
      a = a * b
      finalAnswer = a / b
    }
    displayStr = `${a} ${op.symbol} ${b}`
  }

  return { display: displayStr, answer: finalAnswer }
}
