<script setup>
import { ref, reactive, onMounted } from 'vue'

const screen = ref('menu') // menu, game, history
const settings = reactive({
  mode: 'addition',
  level: 'puluhan',
  timer: 5
})

const historyData = ref([])

const startGame = (mode) => {
  settings.mode = mode
  screen.value = 'game'
}

const loadHistory = () => {
  const data = localStorage.getItem('fastmath_history')
  historyData.value = data ? JSON.parse(data) : []
}

onMounted(loadHistory)
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-4 font-sans text-slate-800">
    <div class="max-w-md mx-auto py-10">
      <header class="text-center mb-10">
        <h1 class="text-4xl font-black text-blue-600 italic">FASTMATH</h1>
      </header>
      
      <RouterView />
    </div>
  </div>
</template>