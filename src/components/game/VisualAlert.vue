<script setup>
defineProps({
  timeLimit: Number,
  timeLeft: Number,
  isFinished: Boolean,
  isWrong: Boolean,
})
</script>
<template>
    <div

      :class="[

        'fixed inset-0 pointer-events-none z-50 transition-opacity duration-300',

        timeLeft < 2 && timeLimit && !isFinished || isWrong ? 'opacity-100' : 'opacity-0',

      ]"

      style="background: radial-gradient(circle, transparent 40%, rgba(239, 68, 68, 0.15) 100%)"

    >

      <div

        v-if="isWrong"

        class="absolute inset-0 bg-red-500/30 backdrop-blur-[1px] animate-flash"

      ></div>
      </div>
</template>
<style scoped>
  @keyframes breathe {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-breathe {
  animation: breathe 1.5s ease-in-out infinite;
}

/* Transisi halus agar tidak mengagetkan */
.transition-all {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>