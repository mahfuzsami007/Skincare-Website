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
            ['id' => 1, 'name' => 'TIAM BLUE PEPTIDE CALM DOWN SERUM 30ML', 'price' => 1500],
            ['id' => 2, 'name' => 'TIAM TXA WHITENING CREAM 50ML', 'price' => 1900],
            ['id' => 3, 'name' => 'PURITO Mighty Bamboo Cleanser 30ml', 'price' => 700],
            ['id' => 4, 'name' => 'Klairs Rich Moist Soothing Serum 3ml', 'price' => 30],
            ['id' => 5, 'name' => 'BEAUTY OF JOSEON RELIEF SUN 50ml', 'price' => 1700, 'sale_price' => 1300],
            ['id' => 6, 'name' => 'Skin1004 Madagascar Centella Sun Serum', 'price' => 1900, 'sale_price' => 1300],
            ['id' => 7, 'name' => 'AXIS-Y Dark Spot Correcting Glow Serum', 'price' => 1900, 'sale_price' => 1100],
            ['id' => 8, 'name' => 'COSRX Advanced Snail 92 Cream 100g', 'price' => 1700, 'sale_price' => 1500],
            ['id' => 9, 'name' => '[HEIMISH] Moringa BB Cream #23C NUDE', 'price' => 1700, 'sale_price' => 1200],
            ['id' => 10, 'name' => '[HEIMISH] Moringa BB Cream #25N MEDIUM', 'price' => 1700, 'sale_price' => 1500],
            ['id' => 11, 'name' => '[HEIMISH] Moringa BB Cream #27N LIGHT TAN', 'price' => 1700, 'sale_price' => 1500],
            ['id' => 12, 'name' => '[Heimish] RX HYALURONIC ACID 2% SERUM', 'price' => 1700, 'sale_price' => 1500],
        ];

        foreach ($products as $prod) {
            Product::updateOrCreate(
                ['id' => $prod['id']], // Look for product by ID
                [
                    'name' => $prod['name'],
                    'slug' => Str::slug($prod['name']),
                    'price' => $prod['price'],
                    'sale_price' => $prod['sale_price'] ?? null,
                    'stock' => 100,
                    'is_active' => true,
                ]
            );
        }
    }
}