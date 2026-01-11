import { generateQuestionLogic } from '@/services/questionGenerator' // Sementara import logic lama kamu
export const QuestionEngine = {
  generate(mode, level, method) {
    return generateQuestionLogic(mode, level, method)
  },

  isCorrect(userInput, targetAnswer) {
    return parseInt(userInput) === targetAnswer
  },

  isInputFull(userInput, targetAnswer) {
    return userInput.toString().length >= targetAnswer.toString().length
  },
}
