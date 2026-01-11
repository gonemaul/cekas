<script setup>
defineProps({
  display: String,
  userInput: String,
  isWrong: Boolean,
  combo: Number,
  showKeypad: Boolean,
  methodTitle: String,
})
</script>

<template>
  <div class="w-full flex flex-col items-center justify-center py-4 text-center">
    <transition name="pop">
      <div
        v-if="combo > 1"
        class="mb-4 bg-orange-500 text-white px-4 py-1 rounded-full text-[10px] font-black italic shadow-lg"
      >
        🔥 {{ combo }} COMBO!
      </div>
    </transition>

    <h2
      :class="[
        'font-black text-slate-800 tracking-tighter italic leading-none transition-all duration-300 mb-6',
        display.length > 8 ? 'text-6xl' : 'text-8xl',
        showKeypad ? 'text-4xl' : 'text-6xl',
        isWrong ? 'text-red-600 scale-95' : '',
      ]"
    >
      {{ display }}
    </h2>

    <div
      :class="[
        'inline-flex items-center justify-center px-10 py-4 min-w-[180px] min-h-[90px] rounded-[2.5rem] border-4 transition-all duration-300 shadow-sm',
        isWrong
          ? 'bg-red-50 border-red-500 text-red-600 animate-shake'
          : userInput
            ? 'bg-blue-50 border-blue-600 text-blue-600'
            : 'bg-white border-slate-100 text-slate-200',
      ]"
    >
      <span class="text-6xl font-black tracking-widest">
        {{ userInput || '?' }}
      </span>
    </div>

    <p
      v-if="methodTitle"
      class="mt-8 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] opacity-60"
    >
      Metode: {{ methodTitle }}
    </p>
  </div>
</template>

<style scoped>
.animate-shake {
  animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.pop-enter-active {
  animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes pop-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
