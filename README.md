# Skincare BD - Full Stack E-Commerce Platform

A modern, fast, and secure full-stack e-commerce application for skincare products. Built with a React (Vite) frontend and a Laravel REST API backend.

## 🚀 Features

- **User Authentication**: Secure login and registration using Laravel Sanctum.
- **Role-Based Access Control**: Separate roles for `admin` and `user` using Spatie Permissions.
- **Product Catalog**: Beautiful landing page, full shop page with pagination, filtering, and sorting.
- **Shopping Cart**: Persistent cart saved to the database. Add, update quantities, and remove items.
- **Quick View**: Interactive modal to view product details without leaving the page.
- **User Dashboard**: Manage account details, view order history, update shipping/billing addresses, and view active offers.
- **Media Management**: Automatic image handling using Spatie Media Library.
- **Modern UI**: Pixel-perfect design matching premium skincare brands, built with Tailwind CSS v4.

## 🛠 Tech Stack

**Frontend:**
- React 18 (Vite)
- TypeScript
- Tailwind CSS (v4)
- React Router DOM
- Axios
- Lucide React (Icons)
- Embla Carousel

**Backend:**
- Laravel 11
- MySQL
- Laravel Sanctum (API Authentication)
- Spatie Laravel Permission (Roles & Permissions)
- Spatie Laravel Media Library (Product Images)

---

## 📁 Project Structure
text
├── skincare-backend/       # Laravel REST API
│   ├── app/Models/         # Database Models (Product, User, Cart, etc.)
│   ├── app/Http/Controllers/Api/ # API Controllers
│   ├── routes/api.php      # API Routes
│   └── database/seeders/   # Database Seeders
│
└── skincare-frontend/      # React Vite App
    ├── src/components/     # Reusable UI Components
    ├── src/pages/          # Page Components (Shop, Cart, Dashboard)
    ├── src/context/        # React Context (Auth, Cart)
    ├── src/lib/            # Axios Config & Utilities
    └── src/data/           # Static mock data (if applicable)

---

## 💻 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) & **npm**
- **PHP** (v8.2 or higher)
- **Composer**
- **MySQL** (via XAMPP, Laragon, or native install)
- **Git**

---

## ⚙️ Installation Guide

### 1. Clone the Repository

git clone https://github.com/your-username/skincare-ecommerce.git
cd skincare-ecommerce


### 2. Backend Setup (Laravel)
Navigate to the backend folder:
cd skincare-backend

Install PHP dependencies:
composer install

Create your environment file and generate the application key:
cp .env.example .env
php artisan key:generate

Database Configuration:
Open the .env file and update your database credentials:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=skincare_db
DB_USERNAME=root
DB_PASSWORD=

Run migrations and seed the database (this will create tables, roles, and 12 dummy products):
php artisan migrate:fresh --seed

Create the symbolic link for storage (required for product images):
php artisan storage:link

Start the Laravel development server:
php artisan serve

---

### 3. Frontend Setup (React)

Open a new terminal window and navigate to the frontend folder:
cd skincare-frontend

Install Node dependencies:
npm install

Start the Vite development server:
npm run dev
