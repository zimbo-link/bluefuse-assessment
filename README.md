<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

Run the usual setup commands for a Laravel project:

```
composer update
npm install
npm run dev
```

Generate an app key:

```
php artisan key:generate
```

Make sure your db is set in the .env file, mine is as follows:

```
DB_CONNECTION=mysql
DB_HOST=mysql.loc.svc.23b.io
DB_PORT=3306
DB_DATABASE=devapp
DB_USERNAME=root
DB_PASSWORD=root
```

Run these commands to seed the database.

```
php artisan migrate
php artisan db:seed --class=DatabaseSeeder
```

Serve the application:

```
php artisan serve
```
The user and password is:

```
user: t.f.schuil@gmail.com
pass: password
```

You should now be able to login.


