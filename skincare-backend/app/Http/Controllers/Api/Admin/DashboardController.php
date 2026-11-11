<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use App\Models\Order;

class DashboardController extends Controller
{
    public function index()
    {
        // Calculate total revenue (only from completed/processing orders)
        $totalRevenue = Order::whereIn('status', ['processing', 'completed'])->sum('total_amount');
        
        // Get counts
        $totalOrders = Order::count();
        $totalProducts = Product::count();
        $totalCustomers = User::role('user')->count();

        // Get recent orders
        $recentOrders = Order::with('user')->latest()->take(5)->get();

        return response()->json([
            'stats' => [
                'revenue' => $totalRevenue,
                'orders' => $totalOrders,
                'products' => $totalProducts,
                'customers' => $totalCustomers,
            ],
            'recent_orders' => $recentOrders
        ]);
    }
}