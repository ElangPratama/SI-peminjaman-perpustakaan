<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Perintah untuk membuat tabel 'transactions'
        Schema::create('transactions', function (Blueprint $table) {
            $table->id(); // Kolom 'id' sebagai Primary Key

            // Kolom Foreign Key untuk relasi ke tabel 'members'
            $table->foreignId('member_id')->constrained('members')->onDelete('cascade');

            // Kolom Foreign Key untuk relasi ke tabel 'books'
            $table->foreignId('book_id')->constrained('books')->onDelete('cascade');

            $table->date('borrow_date'); // Tanggal peminjaman
            $table->date('return_date')->nullable(); // Tanggal pengembalian, boleh kosong (null)
            $table->enum('status', ['dipinjam', 'dikembalikan'])->default('dipinjam'); // Status peminjaman

            $table->timestamps(); // Kolom 'created_at' dan 'updated_at'
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
};