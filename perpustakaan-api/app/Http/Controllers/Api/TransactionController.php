<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Book; // Kita butuh model Book
use Illuminate\Http\Request;
use App\Http\Resources\TransactionResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon; // Untuk bekerja dengan tanggal

class TransactionController extends Controller
{
    /**
     * Menampilkan semua data transaksi.
     */
    public function index()
    {
        // Mengambil data dengan relasi ke buku dan anggota (Eager Loading)
        $transactions = Transaction::with(['book', 'member'])->latest()->paginate(10);
        return new TransactionResource(true, 'List Data Transaksi', $transactions);
    }

    /**
     * Menyimpan data transaksi peminjaman baru.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'member_id' => 'required|integer|exists:members,id',
            'book_id'   => 'required|integer|exists:books,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Cari buku yang akan dipinjam
        $book = Book::find($request->book_id);

        // Cek apakah stok buku masih tersedia
        if ($book->stock < 1) {
            return new TransactionResource(false, 'Stok buku tidak mencukupi!', null);
        }

        // Buat transaksi baru
        $transaction = Transaction::create([
            'member_id'   => $request->member_id,
            'book_id'     => $request->book_id,
            'borrow_date' => Carbon::now(),
            'status'      => 'dipinjam',
        ]);

        // Kurangi stok buku
        $book->decrement('stock');

        // Refresh data transaksi untuk mendapatkan data yang terupdate
        $transaction->refresh();

        return new TransactionResource(true, 'Transaksi Peminjaman Berhasil Ditambahkan!', $transaction);
    }


    /**
     * Menampilkan detail satu transaksi.
     */
    public function show($id)
    {
        $transaction = Transaction::with(['book', 'member'])->find($id);

        if ($transaction) {
            return new TransactionResource(true, 'Detail Data Transaksi', $transaction);
        }

        return new TransactionResource(false, 'Data Transaksi Tidak Ditemukan!', null);
    }

    /**
     * Memperbarui transaksi (proses pengembalian buku).
     */
    public function update(Request $request, $id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return new TransactionResource(false, 'Data Transaksi Tidak Ditemukan!', null);
        }
        
        // Cek jika buku sudah dikembalikan
        if($transaction->status == 'dikembalikan') {
            return new TransactionResource(false, 'Buku ini sudah dikembalikan sebelumnya.', null);
        }

        // Update status dan tanggal kembali
        $transaction->update([
            'status'      => 'dikembalikan',
            'return_date' => Carbon::now(),
        ]);

        // Tambah stok buku yang dikembalikan
        $transaction->book->increment('stock');

        $transaction->refresh();

        return new TransactionResource(true, 'Buku Berhasil Dikembalikan!', $transaction);
    }
}