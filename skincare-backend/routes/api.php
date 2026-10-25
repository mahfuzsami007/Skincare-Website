<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\ProductController;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// --- Public Routes ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public Product Routes (For your React Frontend)
Route::get('/products', function () {
    return response()->json(
        Product::where('is_active', true)->with(['category', 'brand'])->latest()->get()
            ->map(function ($product) {
                // Format image URL for the frontend
                $product->image_url = $product->getFirstMediaUrl('products') ?: 'https://via.placeholder.com/600';
                return $product;
            })
    );
});

Route::get('/products/{slug}', function ($slug) {
    $product = Product::where('slug', $slug)->with(['category', 'brand'])->firstOrFail();
    $product->image_url = $product->getFirstMediaUrl('products') ?: 'https://via.placeholder.com/600';
    return response()->json($product);
});
   
// --- Protected Routes (All logged-in users) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
     Route::get('/cart', [\App\Http\Controllers\Api\CartController::class, 'index']);
    Route::post('/cart', [\App\Http\Controllers\Api\CartController::class, 'store']);
    Route::put('/cart/{cartItem}', [\App\Http\Controllers\Api\CartController::class, 'update']);
    Route::delete('/cart/{cartItem}', [\App\Http\Controllers\Api\CartController::class, 'destroy']);
    
    // --- Admin Only Routes ---
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::apiResource('products', ProductController::class);
        // You can add Categories, Brands, Orders here later
    });
});