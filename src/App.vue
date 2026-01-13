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
  <div class="max-w-lg mx-auto min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
   <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <div :key="$route.path"> <component :is="Component" />
      </div>
    </transition>
  </router-view>
  </div>
</template>
<style>
/* Animasi Page Fade-Slide */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease-in-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
