<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\CustomerCoupon;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth', ['except' => ['index', 'show', 'getOrdersUser', 'isPaid']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = Order::all()->load(["order_details.product", "statuses"]);


        // $orders = DB::table('orders')->join('order_details', 'order_details.order_id', '=', 'orders.id')->get();

        return response()->json([
            'status' => 200,
            'orders' => $orders,
        ]);
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
     * @param  \App\Http\Requests\StoreOrderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreOrderRequest $request)
    {
        $order = Order::create([
            'name' => $request->input('name'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
            'city' => $request->input('city'),
            'payment_method' => $request->input('payment_method'),
            'items_price' => $request->input('items_price'),
            'shipping_price' => $request->input('shipping_price'),
            'tax_price' => $request->input('tax_price'),
            'total_price' => $request->input('total_price'),
            'cus_id' => $request->input('cus_id'),
        ]);

        // $items = json_decode($request->input('orderItems'), true);

        foreach ($request->input('items') as $item) {
            $orderDetals = OrderDetail::create([
                'order_id' => $order->id,
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'subtotal' => $item['quantity'] * $item['price'],
            ]);

            $product = Product::find($item['id']);

            if (!$product) {
                return response()->json(['status' => 404, 'message' => 'Product of this order_detail not found']);
            } else {
                $product->stock = $product->stock - $item['quantity'];
                $product->update();
            }
        }

        $cus_id = $request->input('cus_id');
        $coupon_id = $request->input('coupon_id');

        if ($coupon_id && $coupon_id != 0) {
            $customercoupon = CustomerCoupon::where('cus_id', '=', $cus_id)->where('coupon_id', '=', $coupon_id)->first();
            if (!$customercoupon)
                return response()->json(['status' => 404, 'message' => 'Coupon not found']);

            else {
                $customercoupon->is_used = 1;
                $customercoupon->save();
                // return response()->json(['status' => 404, 'customercoupon' => $customercoupon]);
            }
        }

        return response()->json(['status' => 200, 'message' => "Add order successfully", 'order_id' => $order->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order = Order::find($id)->load("order_details.product");
        if (!$order)
            return response()->json(['status' => 404, 'message' => 'Order not found']);

        return response()->json(['order' => $order]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateOrderRequest  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateOrderRequest $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['status' => 404, 'message' => 'Order not found']);
        }

        $order->update($request->all());
        return response()->json(['status' => 200, 'message' => 'Updated successfully', 'order' => $order]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['status' => 404, 'message' => 'Order not found']);
        }
        $order->delete();
        return response()->json([
            'status' => 200, 'message' => 'Deleted successfully'
        ]);
    }

    public function updateStatus(Request $request)
    {
        $order_id = $request->input('order_id');
        $status_id = $request->input('status_id');

        $order = Order::find($order_id);
        if (!$order) {
            return response()->json(['status' => 404, 'message' => 'Order not found', 'Order' => $order]);
        }
        $order->status_id = $status_id;
        $order->emp_id = $request->input('emp_id');

        if ($status_id == 4) {
            $order->is_delivered = true;
            $order->delivered_at = Carbon::now();
        } else if ($status_id == 6) {
            $order_details = OrderDetail::where('order_id', '=', $order->id)->get();
            foreach ($order_details as $item) {
                $product = Product::find($item['product_id']);

                if (!$product) {
                    return response()->json(['status' => 404, 'message' => 'Product of this order_detail not found']);
                } else {
                    $product->stock = $product->stock + $item['quantity'];
                    $product->update();
                }
            }
        }
        $order->save();

        return response()->json([
            'status' => 200, 'orders' => Order::where('status_id', '=', $status_id)->with("order_details.product")->get(), 'message' => 'Updated successfully'
        ]);
    }

    public function isPaid($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['status' => 404, 'message' => 'Order not found']);
        }

        $order->is_paid = true;
        $order->paid_at = Carbon::now();
        $order->save();

        return response()->json([
            'status' => 200, 'message' => 'Paid successfully'
        ]);
    }

    public function getOrdersUser($id, $status_id)
    {
        // $orders = Order::where(['cus_id', '=', $id],['status_id','=',$status_id])->with("order_details.product")->get();

        $orders = Order::where('cus_id', '=', $id)->where('status_id', '=', $status_id)->with(["order_details.product", "statuses"])->get();

        if (!$orders) {
            return response()->json(['status' => 404, 'message' => 'Order not found']);
        }

        // $orders = DB::table('orders')->join('order_details', 'order_details.order_id', '=', 'orders.id')->get();

        return response()->json([
            'status' => 200,
            'orders' => $orders,
        ]);
    }
    public function getOrdersByStatus($id)
    {
        // $orders = Order::where(['cus_id', '=', $id],['status_id','=',$status_id])->with("order_details.product")->get();

        $orders = Order::where('status_id', '=', $id)->with(["order_details.product", "statuses"])->get();

        if (!$orders) {
            return response()->json(['status' => 404, 'message' => 'Order not found']);
        }

        // $orders = DB::table('orders')->join('order_details', 'order_details.order_id', '=', 'orders.id')->get();

        return response()->json([
            'status' => 200,
            'orders' => $orders,
        ]);
    }
}
