<script setup>
import { APP_IDENTITY } from '@/constants/appConfig';
</script>

<template>
  <header class="pt-8 px-4 flex justify-between items-end">
    <div>
      <h1 class="text-3xl font-black tracking-tighter text-primary leading-none uppercase">
        {{ APP_IDENTITY.name.split(' ')[0] }}<span class="text-slate-400">.</span><span class="text-secondary text-xl italic font-bold lowercase">{{ APP_IDENTITY.name.split(' ')[1] }}</span>
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
  </header>
</template>