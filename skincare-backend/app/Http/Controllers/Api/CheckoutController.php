<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem; // <-- Added this import
use App\Models\CartItem;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|string|in:cod',
        ]);

        $user = $request->user();
        $cartItems = CartItem::with('product')->where('user_id', $user->id)->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        try {
            DB::beginTransaction();

            // Calculate total safely
            $totalAmount = 0;
            foreach ($cartItems as $item) {
                if ($item->product) {
                    $price = $item->product->sale_price ?? $item->product->price;
                    $totalAmount += ($price * $item->quantity);
                }
            }

            $shipping = 80;
            $finalTotal = $totalAmount + $shipping;

            // Create Order
            $order = Order::create([
                'user_id' => $user->id,
                'status' => 'packed',
                'total_amount' => $finalTotal,
            ]);

            // Create Order Items
            foreach ($cartItems as $item) {
                if ($item->product) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity,
                        'price' => $item->product->sale_price ?? $item->product->price,
                    ]);
                }
            }

            // Clear Cart
            CartItem::where('user_id', $user->id)->delete();

            DB::commit();

            return response()->json([
                'message' => 'Order placed successfully',
                'order' => $order
            ], 201);

        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Checkout failed',
                'error' => $e->getMessage(),
                'line' => $e->getLine()
            ], 500);
        }
    }
}