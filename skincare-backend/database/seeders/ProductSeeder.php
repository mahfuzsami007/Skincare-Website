<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['id' => 1, 'name' => 'TIAM BLUE PEPTIDE CALM DOWN SERUM 30ML', 'price' => 1500, 'image' => 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop'],
            ['id' => 2, 'name' => 'TIAM TXA WHITENING CREAM 50ML', 'price' => 1900, 'image' => 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop'],
            ['id' => 3, 'name' => 'PURITO Mighty Bamboo Cleanser 30ml', 'price' => 700, 'image' => 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop'],
            ['id' => 4, 'name' => 'Klairs Rich Moist Soothing Serum 3ml', 'price' => 30, 'image' => 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop'],
            ['id' => 5, 'name' => 'BEAUTY OF JOSEON RELIEF SUN 50ml', 'price' => 1700, 'sale_price' => 1300, 'image' => 'https://images.unsplash.com/photo-1598440947619-2c3f1253d714?q=80&w=600&auto=format&fit=crop'],
            ['id' => 6, 'name' => 'Skin1004 Madagascar Centella Sun Serum', 'price' => 1900, 'sale_price' => 1300, 'image' => 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop'],
            ['id' => 7, 'name' => 'AXIS-Y Dark Spot Correcting Glow Serum', 'price' => 1900, 'sale_price' => 1100, 'image' => 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop'],
            ['id' => 8, 'name' => 'COSRX Advanced Snail 92 Cream 100g', 'price' => 1700, 'sale_price' => 1500, 'image' => 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop'],
            ['id' => 9, 'name' => '[HEIMISH] Moringa BB Cream #23C NUDE', 'price' => 1700, 'sale_price' => 1200, 'image' => 'https://images.unsplash.com/photo-1598440947619-2c3f1253d714?q=80&w=600&auto=format&fit=crop'],
            ['id' => 10, 'name' => '[HEIMISH] Moringa BB Cream #25N MEDIUM', 'price' => 1700, 'sale_price' => 1500, 'image' => 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop'],
            ['id' => 11, 'name' => '[HEIMISH] Moringa BB Cream #27N LIGHT TAN', 'price' => 1700, 'sale_price' => 1500, 'image' => 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop'],
            ['id' => 12, 'name' => '[Heimish] RX HYALURONIC ACID 2% SERUM', 'price' => 1700, 'sale_price' => 1500, 'image' => 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop'],
        ];

        foreach ($products as $prod) {
            $product = Product::updateOrCreate(
                ['id' => $prod['id']],
                [
                    'name' => $prod['name'],
                    'slug' => Str::slug($prod['name']),
                    'price' => $prod['price'],
                    'sale_price' => $prod['sale_price'] ?? null,
                    'stock' => 100,
                    'is_active' => true,
                ]
            );

            if (!$product->hasMedia('products')) {
                try {
                    // Adding without verification to prevent SSL errors on Windows
                    $product->addMediaFromUrl($prod['image'])
                            ->withoutVerifying()
                            ->toMediaCollection('products');
                } catch (\Exception $e) {
                    \Log::error("Failed to download image for product {$product->id}: " . $e->getMessage());
                }
            }
        }
    }
}