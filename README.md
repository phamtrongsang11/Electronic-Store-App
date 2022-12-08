# ElectronicStore

#To run project
1. Put data.json in /backed/storage/app/json
2. Delete all table in database
3. php artisan migrate
4. php artisan db:seed 

#paypal client test account
1. username: sb-diqnp19982275@personal.example.com
2. password: 12345678

#Install library cloudinary
1. composer require jrm2k6/cloudder:0.4.*
2. composer require cloudinary-labs/cloudinary-laravel
3. php artisan vendor:publish --provider="JD\Cloudder\CloudderServiceProvider"
