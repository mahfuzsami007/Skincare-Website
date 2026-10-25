<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index(Request $request)
    {
        // Ensure user is authenticated
        if (!$request->user()) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        try {
            $cart = CartItem::with('product')->where('user_id', $request->user()->id)->get();
            
            $cart->map(function ($item) {
                if ($item->product) {
                    $item->product->image_url = $item->product->getFirstMediaUrl('products') ?: 'https://via.placeholder.com/150';
                }
                return $item;
            });

            return response()->json($cart);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching cart', 'error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        if (!$request->user()) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        try {
            $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1'
            ]);

            $cartItem = CartItem::where('user_id', $request->user()->id)
                ->where('product_id', $request->product_id)
                ->first();

            if ($cartItem) {
                $cartItem->quantity += $request->quantity;
                $cartItem->save();
            } else {
                $cartItem = CartItem::create([
                    'user_id' => $request->user()->id,
                    'product_id' => $request->product_id,
                    'quantity' => $request->quantity
                ]);
            }

            return response()->json(['message' => 'Item added to cart', 'cart_item' => $cartItem], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // THIS WILL TELL US EXACTLY WHAT IS WRONG
            return response()->json([
                'message' => 'Server Error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $request->validate(['quantity' => 'required|integer|min:1']);
        
        if ($cartItem->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $cartItem->update(['quantity' => $request->quantity]);

        return response()->json(['message' => 'Cart updated', 'cart_item' => $cartItem]);
    }

    public function destroy(Request $request, CartItem $cartItem)
    {
        if ($cartItem->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $cartItem->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }
}