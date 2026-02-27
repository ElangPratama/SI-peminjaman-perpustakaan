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
        // Perintah untuk membuat tabel 'books'
        Schema::create('books', function (Blueprint $table) {
            $table->id(); // Membuat kolom 'id' sebagai Primary Key, Auto Increment
            $table->string('title'); // Kolom untuk judul buku (VARCHAR)
            $table->string('author'); // Kolom untuk penulis (VARCHAR)
            $table->string('publisher'); // Kolom untuk penerbit (VARCHAR)
            $table->integer('publication_year'); // Kolom untuk tahun terbit (INTEGER)
            $table->integer('stock'); // Kolom untuk stok buku (INTEGER)
            $table->timestamps(); // Membuat kolom 'created_at' dan 'updated_at' secara otomatis
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Perintah untuk menghapus tabel 'books' jika migrasi di-rollback
        Schema::dropIfExists('books');
    }
};
