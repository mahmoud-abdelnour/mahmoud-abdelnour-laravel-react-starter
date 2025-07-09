<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('react');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/test', [App\Http\Controllers\HomeController::class, 'test'])->name('test');

Route::get('/welcome', function () {
    return view('welcome');
});
