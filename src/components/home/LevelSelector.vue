<script setup>
defineProps(['levels'])
defineEmits(['select'])
</script>

<template>
  <div class="animate-in fade-in slide-in-from-right-4 duration-300">
    <h2 class="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight">
      Tingkat Kesulitan
    </h2>
    <div class="grid gap-4">
      <button
        v-for="lvl in levels"
        :key="lvl.id"
        @click="$emit('select', lvl.id)"
        class="p-6 bg-white border-2 border-slate-100 rounded-3xl text-left hover:border-emerald-500 hover:bg-emerald-50 transition-transform duration-100 active:scale-95 shadow-sm group"
      >
        <p class="font-black text-slate-700 text-xl group-hover:text-emerald-700 uppercase">
          {{ lvl.name }}
        </p>
        <p class="text-sm text-slate-400 font-medium">{{ lvl.desc }}</p>
      </button>
    </div>
  </div>
</template>
