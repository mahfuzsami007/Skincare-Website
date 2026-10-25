<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    // Update User Details
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

    // Get Addresses
    public function getAddresses(Request $request)
    {
        return response()->json($request->user()->addresses);
    }

    // Create or Update Address
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

    // Get Orders
    public function getOrders(Request $request)
    {
        $orders = $request->user()->orders()->with('items')->latest()->get();
        return response()->json($orders);
    }
}