<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    // Get all products (Admin view)
    public function index()
    {
        return response()->json(Product::with(['category', 'brand'])->latest()->paginate(15));
    }

    // Create a new product
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'brand_id' => 'nullable|exists:brands,id',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0|lt:price',
            'stock' => 'required|integer|min:0',
            'is_active' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . uniqid();
        
        $product = Product::create($validated);

        // Handle Image Upload (Spatie MediaLibrary)
        if ($request->hasFile('image')) {
            $product->addMediaFromRequest('image')->toMediaCollection('products');
        }

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product->load(['category', 'brand'])
        ], 201);
    }

    // Update a product
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
            'is_active' => 'boolean',
            'image' => 'nullable|image|max:2048'
        ]);

        $product->update($validated);

        if ($request->hasFile('image')) {
            $product->clearMediaCollection('products'); // Delete old image
            $product->addMediaFromRequest('image')->toMediaCollection('products');
        }

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product->load(['category', 'brand'])
        ]);
    }

    // Delete a product
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted']);
    }
}