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
        // Perintah untuk membuat tabel 'members'
        Schema::create('members', function (Blueprint $table) {
            $table->id(); // Kolom 'id' sebagai Primary Key
            $table->string('name'); // Kolom untuk nama anggota
            $table->text('address'); // Kolom untuk alamat, menggunakan TEXT agar bisa panjang
            $table->string('phone_number'); // Kolom untuk nomor telepon
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
        Schema::dropIfExists('members');
    }
};