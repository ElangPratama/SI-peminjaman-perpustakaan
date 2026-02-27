# 📚 Sistem Informasi Perpustakaan Digital

Aplikasi manajemen perpustakaan modern berbasis **Full-stack Web Architecture**. [cite_start]Proyek ini memisahkan antara **Backend API** (Laravel) dan **Frontend SPA** (React JS) untuk efisiensi administrasi data buku, anggota, dan transaksi peminjaman[cite: 21, 22].

## 🛠️ Teknologi yang Digunakan

- [cite_start]**Backend:** Laravel [cite: 66, 67]
- [cite_start]**Frontend:** React JS & Bootstrap [cite: 70, 77]
- [cite_start]**Database:** PostgreSQL [cite: 75]

## 🚀 Fitur Utama

1. [cite_start]**Katalog Buku Publik:** Tampilan daftar buku berdasarkan kategori dalam format kartu menarik[cite: 23, 43].
2. [cite_start]**Manajemen Admin (CRUD):** Operasi lengkap untuk mengelola data Buku, Anggota, dan Transaksi[cite: 23].
3. [cite_start]**Logika Peminjaman Otomatis:** \* Stok buku otomatis berkurang saat dipinjam dan bertambah saat dikembalikan[cite: 27, 29].
   - [cite_start]Validasi transaksi hanya untuk buku dengan stok > 0[cite: 27].
4. [cite_start]**Keamanan Admin:** Akses halaman manajemen diproteksi dengan sistem login[cite: 26].

## 🔑 Akses Login Admin

- [cite_start]**Username:** `admin` [cite: 47]
- [cite_start]**Password:** `admin1234` [cite: 48]

## 💻 Cara Menjalankan Proyek

### 1. Persiapan Backend (API)

```bash
cd perpustakaan-api
composer install
# Salin file .env dan sesuaikan database PostgreSQL Anda
php artisan key:generate
php artisan migrate
php artisan serve
```
