# ElectronicStore
Electronic Store is a website that sells electronic items such as cellphones, laptop computers, and headphones. It was written in HTML, ReactJS, Bootstraps for the frontend, while PHP, Laravel for the backend and MySQL for the database. It includes basic ecommerce website functionality features like:

- Display product, User-Friendly Navigation
- Product Filtering, Sorting, Review
- Shopping Cart, PayPal payment
- Order Management and CMS
- Revenue Statistics

<img src="https://github.com/phamtrongsang11/TeamChat-React/assets/101312630/f0459aed-e72d-40c0-8a46-eae14daa7e72" width="100%" height="100%">

<img src="https://github.com/phamtrongsang11/Electronic-Store-App/assets/101312630/abbbaf28-d882-48e6-a74a-fcf8b800d060" width="100%" height="100%">

## To run project
1. run artisan update
2. run atisan install
3. create .env file, copy .env.example to .env and define url of database, JWT_SECRET
4. if you already have had databse then delete all table in database
5. run php artisan migrate
6. run php artisan db:seed 

## paypal client test account
1. username: sb-diqnp19982275@personal.example.com
2. password: 12345678

## Install library cloudinary
1. composer require jrm2k6/cloudder:0.4.*
2. composer require cloudinary-labs/cloudinary-laravel
3. php artisan vendor:publish --provider="JD\Cloudder\CloudderServiceProvider"
