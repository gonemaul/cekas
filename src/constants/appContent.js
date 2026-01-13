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
    version: 'v1.9.0',
    date: 'Januari 2026',
    title: 'Smart Logic Engine',
    changes: [
      'Sistem "Anti-Gagal": Menghapus soal yang menghasilkan angka negatif atau pecahan (koma).',
      'Aturan Matematika Benar: Perbaikan urutan hitung campuran (Kabataku) pada soal berantai.',
      'Variasi Soal Lebih Pintar: Mencegah munculnya soal yang sama atau hanya bertukar posisi angka.',
      'Tantangan Seimbang: Menghapus angka yang terlalu mudah (seperti perkalian 1) agar latihan lebih efektif.',
      'Optimasi Layar: Penyesuaian panjang soal agar tetap pas dan rapi di semua ukuran layar HP.',
    ],
  },
  {
    version: 'v1.8.4',
    date: 'Januari 2026',
    title: 'Tampilan Lebih Segar & Stabil',
    changes: [
      'Pembaruan desain halaman Kursus dan Detail Materi agar lebih nyaman dibaca',
      'Perbaikan navigasi agar perpindahan halaman lebih lancar tanpa kendala layar kosong',
      'Penyempurnaan tampilan menu atas (Header) yang kini tetap terlihat saat layar digulir',
      'Sinkronisasi data skor antara halaman utama, riwayat, dan permainan',
    ],
  },
  {
    version: 'v1.8.1-beta',
    date: 'Januari 2026',
    title: 'Identitas Visual Baru',
    changes: [
      'Wajah baru Cekas dengan tema warna Biru-Hijau yang lebih modern',
      'Penambahan menu Pusat Informasi untuk bantuan dan panduan bermain',
      'Tampilan statistik terbaik kini muncul lebih rapi di halaman utama',
    ],
  },
  {
    version: 'v1.7.0',
    date: 'Januari 2026',
    title: 'Akses Lebih Mudah',
    changes: [
      'Aplikasi kini bisa diinstal ke layar utama HP dengan lebih mudah',
      'Dukungan penggunaan aplikasi tanpa koneksi internet (Offline)',
      'Layar pembuka (Splash Screen) yang lebih elegan saat aplikasi dibuka',
    ],
  },
]
