<template>
  <div class="space-y-6">
    <div class="grid grid-cols-2 gap-4">
      <button @click="goToGame('addition')" class="p-8 rounded-2xl text-white font-bold text-xl shadow-lg active:scale-95 transition-transform bg-orange-500">➕ Tambah</button>
      <button @click="goToGame('subtraction')" class="p-8 rounded-2xl text-white font-bold text-xl shadow-lg active:scale-95 transition-transform bg-blue-500">➖ Kurang</button>
      <button @click="goToGame('multiplication')" class="p-8 rounded-2xl text-white font-bold text-xl shadow-lg active:scale-95 transition-transform bg-purple-500">✖️ Kali</button>
      <button @click="goToGame('division')" class="p-8 rounded-2xl text-white font-bold text-xl shadow-lg active:scale-95 transition-transform bg-green-500">➗ Bagi</button>
      <button @click="goToGame('random')" class="p-8 rounded-2xl text-white font-bold text-xl shadow-lg active:scale-95 transition-transform bg-rose-500 col-span-2">🎲 Campuran (Acak)</button>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <label class="block text-sm font-bold mb-3">Pilih Tingkat Kesulitan:</label>
      <div class="flex flex-col gap-2">
        <label v-for="l in ['satuan', 'puluhan', 'ratusan','berantai']" :key="l" class="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-slate-50">
          <input type="radio" v-model="level" :value="l" class="w-4 h-4" />
          <span class="capitalize">{{ l }}</span>
        </label>
      </div>
    </div>

    <router-link to="/history" class="block w-full text-center py-3 font-bold text-slate-500 border-2 border-dashed border-slate-300 rounded-2xl">
      📜 Riwayat Skor
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const level = ref('puluhan')

const goToGame = (mode) => {
  router.push({ name: 'game', params: { mode, level: level.value } })
}
</script>