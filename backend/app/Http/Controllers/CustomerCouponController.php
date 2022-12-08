<?php

namespace App\Http\Controllers;

use App\Models\CustomerCoupon;
use App\Http\Requests\StoreCustomerCouponRequest;
use App\Http\Requests\UpdateCustomerCouponRequest;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Claims\Custom;

class CustomerCouponController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth', ['except' => ['index', 'show', 'getCouponByUser']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCustomerCouponRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // foreach ($request->input('items') as $item) {
        //     $customer_coupon = CustomerCoupon::create([
        //         'coupon_id' => $item['coupon_id'],
        //         'cus_id' => $item['cus_id'],
        //     ]);
        // }

        $coupon_id = $request->input('coupon_id');
        $cus_id  = $request->input('cus_id');

        $exist = CustomerCoupon::where('cus_id', '=', $cus_id)->where('coupon_id', '=', $coupon_id)->first();
        if ($exist) {
            return response()->json(['status' => 404, "message" => "You have already had it"]);
        }

        $cus_coupon = CustomerCoupon::create([
            'coupon_id' => $coupon_id,
            'cus_id' => $cus_id,
        ]);

        return response()->json(['status' => 200, "message" => "Inserted successfully", "exist" => $exist]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CustomerCoupon  $customerCoupon
     * @return \Illuminate\Http\Response
     */
    public function show(CustomerCoupon $customerCoupon)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CustomerCoupon  $customerCoupon
     * @return \Illuminate\Http\Response
     */
    public function edit(CustomerCoupon $customerCoupon)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCustomerCouponRequest  $request
     * @param  \App\Models\CustomerCoupon  $customerCoupon
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCustomerCouponRequest $request, CustomerCoupon $customerCoupon)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CustomerCoupon  $customerCoupon
     * @return \Illuminate\Http\Response
     */
    public function destroy(CustomerCoupon $customerCoupon)
    {
        //
    }

    public function getCouponByUser($id)
    {
        $cus_coupon = CustomerCoupon::where('cus_id', '=', $id)->where('is_used', '=', false)->with("coupon")->get();

        if (!$cus_coupon) {
            return response()->json(['status' => 404, 'message' => 'Order not found']);
        }

        return response()->json([
            'status' => 200,
            'cus_coupon' => $cus_coupon,
        ]);
    }
}
