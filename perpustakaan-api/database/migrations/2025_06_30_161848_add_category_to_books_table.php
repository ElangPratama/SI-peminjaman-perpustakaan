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
        // Perintah untuk mengubah tabel 'books'
        Schema::table('books', function (Blueprint $table) {
            // Menambahkan kolom 'category' setelah kolom 'publisher'
            // nullable() berarti kolom ini boleh kosong
            // default('Umum') akan mengisi semua data lama dengan kategori "Umum"
            $table->string('category')->after('publisher')->nullable()->default('Umum');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Perintah untuk menghapus kolom 'category' jika migrasi di-rollback
        Schema::table('books', function (Blueprint $table) {
            $table->dropColumn('category');
        });
    }
};
