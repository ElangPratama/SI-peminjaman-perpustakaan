<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Import Controller
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\TransactionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rute untuk resource 'books'
Route::apiResource('books', BookController::class);

// Rute untuk resource 'members'
Route::apiResource('members', MemberController::class);

// Rute untuk resource 'transactions'
// Catatan: kita hanya akan menggunakan store, index, show, dan update.
// apiResource akan membuat semuanya, tapi kita bisa memilih yang akan digunakan di frontend.
Route::apiResource('transactions', TransactionController::class);
