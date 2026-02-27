# 📚 Sistem Informasi Perpustakaan Digital

Aplikasi manajemen perpustakaan modern berbasis **Full-stack Web Architecture**.
Proyek ini memisahkan antara **Backend API** (Laravel) dan **Frontend SPA** (React JS) untuk efisiensi administrasi data buku, anggota, dan transaksi peminjaman

## 🛠️ Teknologi yang Digunakan

- **Backend:** Laravel
- **Frontend:** React JS & Bootstrap
- **Database:** PostgreSQL

## 🚀 Fitur Utama

1. **Katalog Buku Publik:** Tampilan daftar buku berdasarkan kategori dengan menarik.
2. **Manajemen Admin (CRUD):** Operasi lengkap untuk mengelola data Buku, Anggota, dan Transaksi.
3. **Keamanan Admin:** Akses halaman manajemen diproteksi dengan sistem login

## 🔑 Akses Login Admin

- **Username:** `admin`
- **Password:** `admin1234`

## 💻 Cara Menjalankan Proyek

### 1. Persiapan Backend (API)

1. Masuk ke direktori: `cd perpustakaan-api`
2. Instal dependensi: `composer install`
3. Konfigurasi database.
4. Generate Key: `php artisan key:generate`
5. Migrasi Database: `php artisan migrate`
6. Jalankan Server: `php artisan serve`
   _Backend berjalan di: http://127.0.0.1:8000_

### 2. Persiapan Frontend (React)

1. Masuk ke direktori: `cd perpustakaan-frontend`
2. Instal dependensi: `npm install`
3. Jalankan Aplikasi: `npm start`
   _Frontend berjalan di: http://localhost:3000_
