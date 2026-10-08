<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

use App\Http\Controllers\Api\SigopilController;

Route::get('/citizens', [SigopilController::class, 'getCitizens']);
Route::get('/tracking/{identifier}', [SigopilController::class, 'getTracking']);
Route::post('/login', [SigopilController::class, 'login']);
Route::post('/reports', [SigopilController::class, 'submitReport']);

Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'app' => 'Sigopil Backend API Laravel']);
});
