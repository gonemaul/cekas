export const GameEngine = {
  updateStats(isCorrect, state) {
    return {
      score: isCorrect ? state.score + 1 : state.score,
      lives: isCorrect ? state.lives : state.lives - 1,
      combo: isCorrect ? state.combo + 1 : 0,
      isWrong: !isCorrect,
    }
  },
}
