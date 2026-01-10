<script setup>
import { APP_IDENTITY } from '@/constants/appConfig';
</script>

<template>
  <header class="pt-8 px-4 flex justify-between items-center">
    <div @click="router.push('/')" class="cursor-pointer group">
      <h1 class="text-3xl font-black tracking-tighter text-primary leading-none uppercase italic">
        {{ APP_IDENTITY.name }}<span class="text-secondary">.</span>
      </h1>
      <p class="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1 group-hover:text-primary transition-colors">
        {{ APP_IDENTITY.slogan }}
      </p>
    </div>
    
    <div class="flex flex-col items-end">
      <div class="p-2 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-white shadow-sm">
        <span class="text-primary font-black text-xs">{{ APP_IDENTITY.version }}</span>
      </div>
    </div>
  </header>
</template>