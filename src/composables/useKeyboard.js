import { ref, nextTick } from 'vue'

export function useKeyboard(userInputRef) {
  const inputField = ref(null)

  // Fungsi untuk memaksa fokus kembali ke hidden input
  const forceFocus = () => {
    nextTick(() => {
      if (inputField.value) {
        inputField.value.focus()
      }
    })
  }

  // Handler untuk Custom Keypad (Layar)
  const handleKeyPress = (num, callback) => {
    userInputRef.value += num.toString()

    // Haptic feedback (Hanya Android/Chrome Mobile)
    if ('vibrate' in navigator) navigator.vibrate(15)

    // Jalankan callback (biasanya checkAnswer)
    if (callback) callback()

    // Pastikan fokus tidak hilang setelah klik tombol layar
    forceFocus()
  }

  // Handler untuk tombol Clear/Backspace
  const handleClear = () => {
    userInputRef.value = ''
    forceFocus()
  }

  return {
    inputField,
    forceFocus,
    handleKeyPress,
    handleClear,
  }
}
