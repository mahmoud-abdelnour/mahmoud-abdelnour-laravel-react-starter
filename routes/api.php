<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserAPIController;
use App\Http\Controllers\API\RolesAPIController;
use App\Http\Controllers\API\PermissionsAPIController;
use App\Http\Controllers\API\SettingsAPIController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');



Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('register', [AuthController::class, 'register']);

/* 
Route::get('roles/allRoles', [RolesAPIController::class,'allRoles']);
Route::resource('roles', RolesAPIController::class);

Route::resource('users', UserAPIController::class);
Route::resource('permissions', PermissionsAPIController::class);
 */

Route::middleware('auth:api')->group(function () {
    Route::get('config', [UserAPIController::class,"config"]);
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('roles/allRoles', [RolesAPIController::class,'allRoles']);
    Route::resource('roles', RolesAPIController::class);

    Route::resource('users', UserAPIController::class);
    Route::resource('permissions', PermissionsAPIController::class);

    Route::get('edit-profile', [UserAPIController::class, 'editProfile'])->name('edit-profile');
    Route::post('update-profile', [UserAPIController::class, 'updateProfile'])->name('update-profile');

    Route::resource('settings', SettingsAPIController::class);
    Route::post('settings', [SettingsAPIController::class, 'update']);

});


/******
 * 
 * product model
 *  id
 *  product_name
 *  product_description
 *  product_category_id
 *  product_price
 *  created_at
 *  updated_at
 * 
 * 
 * 
 * product_categories
 *  id
 *  name
 *  created_at
 *  updated_at
 *  
 * 
 */