<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Brand;
use Illuminate\Support\Str;

class CategoryBrandSeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['Cleansers', 'Serums', 'Moisturizers', 'Sunscreens'];
        foreach ($categories as $cat) {
            Category::firstOrCreate(['name' => $cat], ['slug' => Str::slug($cat)]);
        }

        $brands = ['COSRX', 'Beauty of Joseon', 'SKIN1004', 'CeraVe', 'The Ordinary'];
        foreach ($brands as $brand) {
            Brand::firstOrCreate(['name' => $brand], ['slug' => Str::slug($brand)]);
        }
    }
}