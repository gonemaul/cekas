// src/constants/appContent.js

export const HELP_GUIDE = [
  {
    title: 'Pilih Operasi',
    desc: 'Tersedia Penjumlahan, Pengurangan, Perkalian, dan Pembagian. Pilih yang ingin kamu latih.',
    icon: 'CalculatorIcon',
  },
  {
    title: 'Atur Level',
    desc: 'Tentukan rentang angka (Easy, Medium, Hard). Semakin tinggi level, angka akan semakin menantang.',
    icon: 'AcademicCapIcon',
  },
  {
    title: 'Target Waktu',
    desc: 'Pilih batas waktu per soal. Mode Tanpa Batas cocok untuk belajar, sementara mode Kilat melatih refleks.',
    icon: 'ClockIcon',
  },
]

export const PATCH_NOTES = [
  {
    version: 'v1.8.1-beta',
    date: 'Januari 2026',
    title: 'Identity & UX Update',
    changes: [
      'Sinkronisasi branding dengan Logo baru (Blue-Emerald)',
      'Refaktor HomeView menjadi komponen modular',
      'Penambahan Info Hub (Tentang, Bantuan, Update)',
      'Perbaikan layout header sticky dan z-index',
    ],
  },
  {
    version: 'v1.7.1-beta',
    date: 'Januari 2026',
    title: 'PWA Stability',
    changes: [
      'Perbaikan manifest untuk instalasi Android/iOS',
      'Dukungan mode offline (Service Worker)',
      'Optimasi splash screen warna gelap',
    ],
  },
  {
    version: 'v1.6.0-beta',
    date: 'Januari 2026',
    title: 'Engine Refactor',
    changes: [
      'Pembaruan logika generator soal matematika',
      'Sistem penyimpanan history di LocalStorage',
      'Transisi antar halaman yang lebih halus',
    ],
  },
]
