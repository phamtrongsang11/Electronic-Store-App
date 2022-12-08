<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\CustomerCouponController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\ReceiveController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\WishListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

route::apiResource('/products', ProductController::class);

route::apiResource("/categories", CategoryController::class);

route::apiResource('/brands', BrandController::class);

route::apiResource('/reviews', ReviewController::class);

route::apiResource('/orders', OrderController::class);

route::apiResource('/receives', ReceiveController::class);

route::apiResource('/coupons', CouponController::class);

route::apiResource('/roles', RoleController::class);

route::apiResource('/productimages', ProductImageController::class);
Route::get('/productimages/fetch/{id}', [ProductImageController::class, 'getImagesProduct']);

route::apiResource('/customercoupons', CustomerCouponController::class);
Route::get('/customercoupons/user/{id}', [CustomerCouponController::class, 'getCouponByUser']);

route::apiResource('/wishlists', WishListController::class);
Route::get('/wishlists/user/{id}', [WishListController::class, 'getWishListByUser']);

route::apiResource('/statuses', StatusController::class);

Route::controller(ProductController::class)->group(function () {
    route::post('/products/search', 'search');
    route::get('/products/slug/{slug}', 'findSlug');
    route::get('/getProductHome', 'getProductHome');
    route::put('/products/updateReview',  'updateReview');
    route::put('/products/active/{id}', 'updateActive');
    // route::get('/products/brand/{brand}', 'relativeProduct');
});

Route::controller(OrderController::class)->group(function () {
    route::put('/orders/status/update', 'updateStatus');
    route::put('/orders/{id}/pay', 'isPaid');
    route::get('/orders/user/{id}/status/{status_id}', 'getOrdersUser');
    route::get('/orders/status/{status_id}', 'getOrdersByStatus');
});

Route::controller(StatisticsController::class)->group(function () {
    route::get('/statistics/totalproducts', 'getTotalProduct');
    route::get('/statistics/totalcustomers', 'getTotalCustomer');
    route::get('/statistics/totalemployees', 'getTotalEmployee');
    route::get('/statistics/totalorders', 'getTotalOrderToday');
    route::get('/statistics/revenue', 'getRevenueYear');
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login')->name('login');
    Route::post('/register', 'register')->name('register');
    Route::post('/logout', 'logout');
    Route::post('/refresh', 'refresh');
    Route::get('/me', 'me');
    Route::put('/updateProfile/{id}', 'updateProfile');
    Route::get('/customers', 'getCustomers');
    Route::get('/employees', 'getEmployees');
    Route::get('/employees/{id}', 'showEmployee');
    Route::put('/user/locked/{id}', 'updateLocked');
    Route::post('/user/createEmployee', 'createEmployee');
    Route::put('/user/updateEmployee', 'updateEmployee');
    Route::put('/user/changePassword', 'changePassword');
});

Route::get('/upload', [FileUploadController::class, 'showUpLoadForm'])->name('show_upload');
Route::post('/upload', [FileUploadController::class, 'storeUploads']);
