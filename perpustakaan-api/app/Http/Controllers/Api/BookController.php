<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use App\Http\Resources\BookResource;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    /**
     * Menampilkan semua data buku.
     */
    public function index()
    {
        $books = Book::latest()->paginate(10);
        return new BookResource(true, 'List Data Buku', $books);
    }

    /**
     * Menyimpan data buku baru.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'     => 'required|string|max:255',
            'author'    => 'required|string|max:255',
            'publisher' => 'required|string|max:255',
            'category'  => 'required|string|max:100', // Validasi untuk kategori
            'publication_year' => 'required|integer|min:1000',
            'stock'     => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $book = Book::create([
            'title'     => $request->title,
            'author'    => $request->author,
            'publisher' => $request->publisher,
            'category'  => $request->category, // Menyimpan kategori
            'publication_year' => $request->publication_year,
            'stock'     => $request->stock,
        ]);

        return new BookResource(true, 'Data Buku Berhasil Ditambahkan!', $book);
    }

    /**
     * Menampilkan detail satu buku.
     */
    public function show($id)
    {
        $book = Book::find($id);

        if ($book) {
            return new BookResource(true, 'Detail Data Buku', $book);
        }
        return new BookResource(false, 'Data Buku Tidak Ditemukan!', null);
    }

    /**
     * Memperbarui data buku.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title'     => 'required|string|max:255',
            'author'    => 'required|string|max:255',
            'publisher' => 'required|string|max:255',
            'category'  => 'required|string|max:100', // Validasi untuk kategori
            'publication_year' => 'required|integer|min:1000',
            'stock'     => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $book = Book::find($id);

        if ($book) {
            $book->update([
                'title'     => $request->title,
                'author'    => $request->author,
                'publisher' => $request->publisher,
                'category'  => $request->category, // Mengupdate kategori
                'publication_year' => $request->publication_year,
                'stock'     => $request->stock,
            ]);
            return new BookResource(true, 'Data Buku Berhasil Diperbarui!', $book);
        }
        return new BookResource(false, 'Data Buku Tidak Ditemukan!', null);
    }

    /**
     * Menghapus data buku.
     */
    public function destroy($id)
    {
        $book = Book::find($id);
        
        if($book) {
            $book->delete();
            return new BookResource(true, 'Data Buku Berhasil Dihapus!', null);
        }
        return new BookResource(false, 'Data Buku Tidak Ditemukan!', null);
    }
}
