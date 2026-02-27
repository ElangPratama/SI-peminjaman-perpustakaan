<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Member; // Menggunakan model Member
use Illuminate\Http\Request;
use App\Http\Resources\MemberResource; // Menggunakan MemberResource
use Illuminate\Support\Facades\Validator;

class MemberController extends Controller
{
    /**
     * Menampilkan semua data anggota.
     */
    public function index()
    {
        $members = Member::latest()->paginate(10);
        return new MemberResource(true, 'List Data Anggota', $members);
    }

    /**
     * Menyimpan data anggota baru.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'          => 'required|string|max:255',
            'address'       => 'required|string',
            'phone_number'  => 'required|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $member = Member::create([
            'name'          => $request->name,
            'address'       => $request->address,
            'phone_number'  => $request->phone_number,
        ]);

        return new MemberResource(true, 'Data Anggota Berhasil Ditambahkan!', $member);
    }

    /**
     * Menampilkan detail satu anggota.
     */
    public function show($id)
    {
        $member = Member::find($id);

        if ($member) {
            return new MemberResource(true, 'Detail Data Anggota', $member);
        }

        return new MemberResource(false, 'Data Anggota Tidak Ditemukan!', null);
    }

    /**
     * Memperbarui data anggota.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name'          => 'required|string|max:255',
            'address'       => 'required|string',
            'phone_number'  => 'required|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $member = Member::find($id);

        if ($member) {
            $member->update([
                'name'          => $request->name,
                'address'       => $request->address,
                'phone_number'  => $request->phone_number,
            ]);
            return new MemberResource(true, 'Data Anggota Berhasil Diperbarui!', $member);
        }
        
        return new MemberResource(false, 'Data Anggota Tidak Ditemukan!', null);
    }

    /**
     * Menghapus data anggota.
     */
    public function destroy($id)
    {
        $member = Member::find($id);
        
        if($member) {
            $member->delete();
            return new MemberResource(true, 'Data Anggota Berhasil Dihapus!', null);
        }
        
        return new MemberResource(false, 'Data Anggota Tidak Ditemukan!', null);
    }
}