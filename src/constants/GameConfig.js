import {
  PlusIcon,
  MinusIcon,
  XMarkIcon,
  VariableIcon,
  SparklesIcon,
} from '@heroicons/vue/24/outline'

export const GAME_CONFIG = {
  // Semua Mode Tersentralisasi
  MODES: [
    {
      id: 'addition',
      name: 'Penjumlahan',
      desc: 'Asah kecepatan totalitas angka.',
      icon: PlusIcon,
      color: 'bg-blue-500',
      symbol: '+',
    },
    {
      id: 'subtraction',
      name: 'Pengurangan',
      desc: 'Latih ketelitian selisih nilai.',
      icon: MinusIcon,
      color: 'bg-emerald-500',
      symbol: '-',
    },
    {
      id: 'multiplication',
      name: 'Perkalian',
      desc: 'Tingkatkan daya ingat kelipatan.',
      icon: XMarkIcon,
      color: 'bg-amber-500',
      symbol: '×',
    },
    {
      id: 'division',
      name: 'Pembagian',
      desc: 'Uji logika distribusi angka.',
      icon: VariableIcon,
      color: 'bg-indigo-500',
      symbol: '÷',
    },
    {
      id: 'random',
      name: 'Campuran',
      desc: 'Tantangan otak multifungsi.',
      icon: SparklesIcon,
      color: 'bg-rose-500',
      symbol: '?',
    },
  ],

  // Semua Level Tersentralisasi
  LEVELS: [
    { id: 'satuan', name: 'Satuan', desc: 'Angka 1-9', range: { min: 1, max: 9 } },
    { id: 'puluhan', name: 'Puluhan', desc: 'Angka 10-99', range: { min: 10, max: 99 } },
    { id: 'ratusan', name: 'Ratusan', desc: 'Angka 100-999', range: { min: 100, max: 999 } },
    { id: 'berantai', name: 'Berantai', desc: '3-5 Angka Acak', count: { min: 3, max: 5 } },
  ],

  // Semua Pilihan Waktu Tersentralisasi
  DIFFICULTIES: [
    {
      id: 'santai',
      label: 'Santai',
      time: 8,
      color: 'bg-emerald-500',
      desc: 'Cocok untuk Belajar',
    },
    { id: 'normal', label: 'Normal', time: 5, color: 'bg-blue-500', desc: 'Standar Cekas' },
    { id: 'kilat', label: 'Kilat', time: 3, color: 'bg-red-500', desc: 'Uji Refleks Otak' },
    {
      id: 'survive',
      label: 'Survive',
      time: null,
      color: 'bg-red-500',
      desc: 'Uji Seberapa Kuat Otak Kamu',
    },
  ],

  SETTINGS: {
    TOTAL_STEPS: 10,
    DEFAULT_TIMER_ID: 'normal',
  },

  // FUNGSI HELPER: Agar bisa dipakai instan di mana saja (Helper Methods)
  getModeById(id) {
    return this.MODES.find((m) => m.id === id)
  },
  getLevelById(id) {
    return this.LEVELS.find((l) => l.id === id)
  },
  getDiffById(id) {
    return (
      this.DIFFICULTIES.find((d) => d.id === id) || this.getDiffById(this.SETTINGS.DEFAULT_TIMER_ID)
    )
  },
}
