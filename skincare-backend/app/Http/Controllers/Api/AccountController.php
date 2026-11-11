<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;
use App\Models\Order; // <-- ADDED THIS
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    public function updateProfile(Request $request)
    {
        $user = $request->user();
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,'.$user->id,
            'password' => 'nullable|string|min:8|confirmed'
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }
        
        $user->save();

        return response()->json(['message' => 'Profile updated', 'user' => $user]);
    }

    public function getAddresses(Request $request)
    {
        return response()->json($request->user()->addresses);
    }

    public function saveAddress(Request $request)
    {
        $request->validate([
            'type' => 'required|in:billing,shipping',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'street' => 'required|string',
            'city' => 'required|string',
            'postcode' => 'required|string',
            'phone' => 'required|string',
        ]);

        $address = Address::updateOrCreate(
            ['user_id' => $request->user()->id, 'type' => $request->type],
            $request->all()
        );

        return response()->json(['message' => 'Address saved', 'address' => $address]);
    }

    public function getOrders(Request $request)
    {
        $orders = $request->user()->orders()->latest()->get();
        return response()->json($orders);
    }

    public function requestReturn(Request $request, Order $order)
    {
        if ($order->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($order->status !== 'delivered') {
            return response()->json(['message' => 'Only delivered orders can be returned'], 400);
        }

        $order->update(['status' => 'returned']);

        return response()->json(['message' => 'Return requested successfully', 'order' => $order]);
    }
}