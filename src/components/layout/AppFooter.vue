<script setup>
import { APP_IDENTITY } from '@/constants/appConfig'
</script>

<template>
  <footer class="p-8 flex flex-col items-center gap-3 mt-auto">
    <div class="flex items-center gap-2 opacity-30">
       <div class="h-px w-8 bg-slate-400"></div>
       <span class="text-[9px] font-black uppercase tracking-[0.3em] text-slate-900">
         {{ APP_IDENTITY.fullName }}
       </span>
       <div class="h-px w-8 bg-slate-400"></div>
    </div>
    <p class="text-[8px] text-slate-300 font-bold uppercase tracking-widest leading-none">
      &copy; {{ new Date().getFullYear() }} {{ APP_IDENTITY.copyright }} • {{ APP_IDENTITY.version }}
    </p>
  </footer>
</template>