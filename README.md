# Laravel React Starter

A full-stack web application with Laravel 12 backend API and React 18 frontend, featuring authentication, role-based access control, media management, and modern UI components.

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

## Features

### Backend (Laravel)
- Laravel 12 with PHP 8.2
- Laravel Passport for OAuth2 authentication
- Role-based permissions with Spatie Laravel-Permission
- Advanced query building with Spatie Laravel-Query-Builder
- Media management with Spatie Laravel-MediaLibrary
- Repository pattern implementation
- RESTful API endpoints

### Frontend (React)
- React 18 with Vite build tool
- Tailwind CSS for utility-first styling
- Form handling with Formik and Yup validation
- State management with Redux (with persistence)
- React Router for navigation
- Responsive sidebar with React Pro Sidebar
- Data tables with React Data Table Component
- Toast notifications
- Font Awesome icons
- Bootstrap 5 components

## Prerequisites

- PHP 8.2+
- Node.js 18+
- Composer 2+
- MySQL 8.0+ or SQLite
- Redis (optional, for queue)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/project-name.git
   cd project-name

Install PHP dependencies:

    composer install

Install JavaScript dependencies:

    npm install

Create and configure environment file:

    cp .env.example .env

    php artisan key:generate

Update your .env file with database credentials and other settings.

Run database migrations:

    php artisan migrate --seed

Install Laravel Passport:

    php artisan passport:install


To start the development servers (Laravel, Vite, and queue worker):

    composer run dev