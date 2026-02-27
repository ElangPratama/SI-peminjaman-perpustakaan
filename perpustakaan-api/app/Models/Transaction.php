<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'member_id',
        'book_id',
        'borrow_date',
        'return_date',
        'status',
    ];

    /**
     * Mendapatkan data buku yang berelasi dengan transaksi ini.
     */
    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    /**
     * Mendapatkan data anggota yang berelasi dengan transaksi ini.
     */
    public function member()
    {
        return $this->belongsTo(Member::class);
    }
}