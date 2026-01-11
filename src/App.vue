<script setup>
import { ref, reactive, onMounted } from 'vue'

const screen = ref('menu') // menu, game, history
const settings = reactive({
  mode: 'addition',
  level: 'puluhan',
  timer: 5,
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
  <div class="max-w-xl mx-auto min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
    <!-- <AppHeader /> -->

    <main class="flex-grow">
      <RouterView />
    </main>

    <!-- <footer class="p-8 text-center border-t border-slate-100">
      <p class="text-[11px] text-slate-400 font-medium italic">
        &copy; {{ new Date().getFullYear() }} {{ APP_IDENTITY.copyright }}
      </p>
    </footer> -->
  </div>
</template>
