🚀 FastMath - Speed Drill App
FastMath adalah aplikasi web berbasis Vue.js yang dirancang khusus untuk melatih kecepatan berhitung (mental math) melalui tantangan aritmatika dengan batasan waktu yang ketat.

🛠 Tech Stack
Framework: Vue.js 3 (Composition API)
Build Tool: Vite
Styling: Tailwind CSS
Storage: Local Storage (Browser-based)
Deployment: Vercel

🎯 Fitur Utama
Multi-Mode & Multi-Level:
Operasi: Penjumlahan, Pengurangan, Perkalian, dan Pembagian.
Tingkat Kesulitan: Satuan (1-9), Puluhan (10-99), Ratusan (100-999), dan Ribuan.
Sistem Timer Per-Soal:
Setiap soal memiliki batas waktu (misal: 5 detik).
Jika waktu habis, otomatis dianggap salah dan lanjut ke soal berikutnya.
Smart Question Generator:
Angka diacak secara dinamis sesuai level.
Khusus Pembagian: Sistem menjamin hasil pembagian adalah angka bulat.
Auto-Validation:
Aplikasi mendeteksi jawaban secara otomatis saat jumlah digit yang dimasukkan sesuai (meminimalisir penggunaan tombol Enter).
History & Progress Tracker:
Menyimpan 10 sesi terakhir ke Local Storage.
Indikator UP ↑ atau DOWN ↓ berdasarkan performa skor dibandingkan sesi sebelumnya.

🔄 Alur Aplikasi (App Flow)
Home: User memilih Jenis Operasi & Level.
Countdown: Jeda 3 detik untuk persiapan.
Gameplay: * Menampilkan soal.
Timer (Progress Bar) berjalan menyusut.
Input jawaban.
Result: Menampilkan skor akhir, akurasi, dan rata-rata kecepatan jawab.
History: Menampilkan tabel performa dari sesi-sesi sebelumnya.

🚧 Batasan Proyek (Anti Over-Engineering)
Tanpa Database: Data hanya disimpan di browser pengguna (Local Storage).
Tanpa Login/Auth: User bisa langsung bermain tanpa registrasi.
Client-side Logic: Semua perhitungan dilakukan di browser untuk kecepatan respon maksimal.

⚙️ Pengembangan (Local Setup)
Bash

# Clone repository
git clone https://github.com/username/fastmath.git

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

🚢 Deployment ke Vercel
Hubungkan repositori GitHub ke Vercel.
Gunakan konfigurasi default Vite.
Deploy.