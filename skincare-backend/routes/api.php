<?php

use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\Admin\ProductController;

// --- Public Routes ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public Product Routes (Paginated)
Route::get('/products', function (Request $request) {
    try {
        $query = Product::where('is_active', true);

        if ($request->has('sort')) {
            switch ($request->sort) {
                case 'price_asc': $query->orderBy('price', 'asc'); break;
                case 'price_desc': $query->orderBy('price', 'desc'); break;
                case 'oldest': $query->oldest(); break;
                default: $query->latest(); break;
            }
        } else {
            $query->latest();
        }

        $products = $query->paginate(12);

        // Fallback images in case Spatie failed to download them
        $fallbackImages = [
            1 => 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
            2 => 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop',
            3 => 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop',
            4 => 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop',
            5 => 'https://images.unsplash.com/photo-1598440947619-2c3f1253d714?q=80&w=600&auto=format&fit=crop',
            6 => 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop',
            7 => 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
            8 => 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop',
            9 => 'https://images.unsplash.com/photo-1598440947619-2c3f1253d714?q=80&w=600&auto=format&fit=crop',
            10 => 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop',
            11 => 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop',
            12 => 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
        ];

        $products->getCollection()->transform(function ($product) use ($fallbackImages) {
            // Try to get Spatie Media URL
            $mediaUrl = $product->getFirstMediaUrl('products');
            
            // If Spatie is empty, use the fallback image for that ID
            $product->image_url = $mediaUrl ?: ($fallbackImages[$product->id] ?? 'https://via.placeholder.com/600');
            
            return $product;
        });

        return response()->json($products);
    } catch (\Throwable $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('/products/{slug}', function ($slug) {
    $product = Product::where('slug', $slug)->with(['category', 'brand'])->firstOrFail();
    $product->image_url = $product->getFirstMediaUrl('products') ?: 'https://via.placeholder.com/600';
    return response()->json($product);
});

// --- Protected Routes ---
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{cartItem}', [CartController::class, 'update']);
    Route::delete('/cart/{cartItem}', [CartController::class, 'destroy']);

        Route::put('/profile', [\App\Http\Controllers\Api\AccountController::class, 'updateProfile']);
    
    Route::get('/addresses', [\App\Http\Controllers\Api\AccountController::class, 'getAddresses']);
    Route::post('/addresses', [\App\Http\Controllers\Api\AccountController::class, 'saveAddress']);
    
    Route::get('/orders', [\App\Http\Controllers\Api\AccountController::class, 'getOrders']);
    
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::apiResource('products', ProductController::class);
    });
});