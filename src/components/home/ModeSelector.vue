<script setup>
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
// Terima data modes dari parent
defineProps(['modes'])
// Beritahu parent kalau ada mode yang dipilih
defineEmits(['select'])
</script>

<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2
      class="text-xl font-black text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-tight"
    >
      <span class="w-2 h-8 bg-blue-600 rounded-full"></span>
      Pilih Operasi
    </h2>

    <div class="grid gap-4">
      <button
        v-for="mode in modes"
        :key="mode.id"
        @click="$emit('select', mode.id)"
        class="group flex items-center justify-between p-5 bg-white border-2 border-slate-100 rounded-3xl hover:border-blue-500 transition-transform duration-100 active:scale-95 shadow-sm"
      >
        <div class="flex items-center gap-4 text-left">
          <div :class="[mode.color, 'p-3 rounded-2xl text-white shadow-lg shrink-0']">
            <component :is="mode.icon" class="w-6 h-6 stroke-[3]" />
          </div>
          <div>
            <span class="block font-extrabold text-slate-700 text-lg leading-tight">{{
              mode.name
            }}</span>
            <span class="block text-xs text-slate-400 font-medium mt-0.5">{{ mode.desc }}</span>
          </div>
        </div>
        <ChevronRightIcon
          class="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors shrink-0"
        />
      </button>
    </div>
  </div>
</template>
