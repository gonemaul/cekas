<script setup>
import { ref, reactive, onMounted } from 'vue'
import { APP_IDENTITY } from '@/constants/appConfig'
import AppHeader from '@/components/AppHeader.vue';

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
    <!-- <header class="max-w-md mx-auto pt-8 mb-5 px-4 flex justify-between items-end">
      <div>
        <h1 class="text-3xl font-black tracking-tighter text-blue-600 leading-none">
          FASTMATH<span class="text-slate-400">.</span
          ><span class="text-emerald-500 text-xl italic font-bold">academy</span>
        </h1>
        <p class="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-1">
          {{ APP_IDENTITY.slogan }}
        </p>
      </div>
      <div class="text-right">
        <span class="text-[10px] font-mono bg-slate-200 px-2 py-0.5 rounded-full text-slate-500">
          {{ APP_IDENTITY.version }}
        </span>
      </div>
    </header> -->
    <AppHeader />

    <main class="flex-grow p-4 mt-6">
      <RouterView />
    </main>

    <footer class="p-8 text-center border-t border-slate-100">
      <p class="text-[11px] text-slate-400 font-medium italic">
        &copy; {{ APP_IDENTITY.copyright }}
      </p>
    </footer>
  </div>
</template>
