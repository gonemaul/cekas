<script setup>
defineProps(['difficulties'])
defineEmits(['select'])
</script>

<template>
  <div class="animate-in fade-in zoom-in duration-300">
    <h2 class="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">Target Waktu</h2>
    <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6 italic">
      Seberapa cepat kamu berpikir?
    </p>

    <div class="grid gap-4">
      <button
        v-for="diff in difficulties"
        :key="diff.id"
        @click="$emit('select', diff.id)"
        class="p-6 bg-white border-2 border-slate-100 rounded-[2rem] text-left hover:border-amber-500 transition-transform duration-100 active:scale-95 shadow-sm group flex items-center justify-between"
      >
        <div>
          <p class="font-black text-slate-700 text-xl uppercase group-hover:text-amber-600">
            {{ diff.label }}
          </p>
          <p class="text-sm text-slate-400 font-medium">{{ diff.desc }}</p>
        </div>
        <div
          class="text-2xl font-black text-amber-500 bg-amber-50 w-14 h-14 rounded-2xl flex items-center justify-center border border-amber-100"
        >
          {{ diff.time ? diff.time + 's' : '∞' }}
        </div>
      </button>
    </div>
  </div>
</template>
